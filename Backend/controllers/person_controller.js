const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Person, Admin } = require('../models');


/**
 * Generates a JWT token for the given user, this token will be used to authenticate the user.
 * @param {Object} person 
 * @returns {String} JWT token
 */
function generateAccessToken(person) {

    delete person.passwordHash;

    return jwt.sign(person, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });
}

/**
 * Validates an email address.
 * @param {String} email 
 * @returns true if the email is valid, false otherwise
 */
function validateEmail(email) {
    const re =/\S+@\S+\.\S+/;
    return re.test(email);
}

/**
 * Hashes a password using bcrypt algorithm.
 * @param {String} password 
 * @returns the hashed password
 */
function encryptPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (_err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
}

/**
 * Asynchrone function that creates a person
 * @route POST - /create
 * @require email, password,username in the request body
 */
exports.createPerson = async (req,res) => {
   try {
    const {username,email,password} = req.body;
    
    if((username && email && password) == false)
    {   
        return res.status(400).json({error: "Champs manquants"});
    }

   
    //Checking the email 
    if(!validateEmail(email))
    {
        return res.status(400).json({error: "Email invalid"});
    }
    const duplicateEmail = await Person.findOne({where : {email : email}});
    console.log({message: duplicateEmail});
    if(duplicateEmail)
    {
        return res.status(400).json({error: "Email already exists"});
    }

    if(password.length < 8)
    {
        return res.status(400).json({error: "Password too short"});
    }

    const passwordHash = await encryptPassword(password);

    
    if(username.length < 4)
    {
        return res.status(400).json({error: "Username too short"});
    }

    Person.findOne({where : {username : username}}).then((personUsername) => 
    {
        if(personUsername)
        {
            return res.status(400).json({error : 'Username already used'});
        }
    }) 

    const personToCreate = {
        username : username, 
        password: passwordHash, 
        email : email,
    };

   
    await Person.create(personToCreate);
    const accessToken = generateAccessToken(personToCreate);

    return res.status(200).json({
        person :personToCreate, 
        accessToken: accessToken });
   } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
   }
}

/**
 * Delete a person 
 * @route DELETE - /delete
 * @param {idPerson, email, password} req body
 * @param {*} res 
 * @returns Deletes the person if the body contains the correct information
 */
exports.deletePerson = async (req,res) => 
{
    try {
        const idPerson = req.user.idPerson;
        const { email, password} = req.body;
        if(!(idPerson && email && password))
        {
            return res.status(400).json({error: "Champs manquants"});
        } 
        
        const person = await Person.findByPk(idPerson);
        if(!person)
        {
            return res.status(400).json({error: "Person doesn't exist"});
        }
        if(person.email != email)
        {
            return res.status(400).json({error :'Email not associated to the account'});
        } 
        if(!(await bcrypt.compare(password,person.password)))
        {
            return res.status(400).json({error :'incorrect password'});
        }

        person.destroy();
        
        return res.status(200).json({message: "Person deleted"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function checkAdminStatus (idPerson)
{
    try {
        const admin = await Admin.findByPk(idPerson);
        if (admin) {
          return 'true';
        } else {
          return 'false';
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        return 'error'; // Handle the error gracefully
      }
}

/**
 * Login using the inforamtion of a person 
 * @route POST - /login
 * @param {username, password} req (body) 
 * @param {*} res 
 * @returns person info and the acces token associated to the person
 */
exports.login = (req,res) => {

    try{
    
    const {username, password} = req.body;
    if(!(username && password))
    {
        return res.status(400).json({error: "Empty fields"});
    }

    if(validateEmail(username))
    {
        Person.findOne({where: {email: username}}).then((person) => {
        if(!person)
        {
            return res.status(400).json({error :'Error with the email/password'});
        }else
        {
            
            bcrypt.compare(password,person.password).then((comparisonPassword=> {
                if(comparisonPassword)
                {
                    plainPerson = {
                        idPerson : person.idPerson,
                        password : person.password, 
                        username : person.username,
                        email : person.email,
                      
                    }

                    const isAdminPromise = checkAdminStatus(person.idPerson);

                    

                    isAdminPromise.then((isAdmin) =>
                    {
                        const accessToken = generateAccessToken(plainPerson);
                        return res.status(200).json({
                            message: "Login accepted",
                            person: plainPerson, 
                            accessToken: accessToken,
                            admin: isAdmin,
                        });
                    })

                   
                }else
                {
                    return res.status(400).json({message: "Error with the Email/Password"});   
                }
            }))
        }
    })
        
    }else{

        Person.findOne({where: {username: username}}).then((person) => {
        if(!person)
        {
            return res.status(400).json({error :'Error with the email/username/password'});
        }else
        {
            bcrypt.compare(password,person.password).then((comparisonPassword=> {
                if(comparisonPassword)
                {
                    plainPerson = {
                        idPerson : person.idPerson,
                        password : person.password, 
                        username : person.username,
                        email : person.email,
                    }

                    const isAdminPromise = checkAdminStatus(person.idPerson);

                    

                    isAdminPromise.then((isAdmin) =>
                    {
                        const accessToken = generateAccessToken(plainPerson);
                        return res.status(200).json({
                            message: "Login accepted",
                            person: plainPerson, 
                            accessToken: accessToken,
                            admin: isAdmin,
                        });
                    })
                        
                }else
                {
                    return res.status(400).json({message: "Error with the Email/Password"});   
                }
            }))
        }
    })

    }
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' }); 
    }

}

/**
 * Get the information of a person using the id of the person
 * @route GET - /info
 * @param {idPerson} req 
 * @param {*} res 
 */
exports.infoPerson = (req,res) =>
{
    const idPerson = req.user.idPerson; 

    
    try {
        if(!idPerson)
        {
            return res.status(400).json({error : 'IdPerson non exsistant'});
        }

        Person.findByPk(idPerson).then(person => {
            if(!person)
            {
                return res.status(400).json({error : 'idPerson not associated to a user'});
            }
            return res.status(200).json({person : person});
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' }); 
    }

}