import express from 'express'
import { User } from '../models/userModel.js'

const router = express.Router()

router.post('/:name', async (req, res) => {
  try{
    if(req.params.name === ''){
      return res.status(400).send({
        message: 'Send required name field!'
      })
    }

    const {name} = req.params

    if(await User.findOne({name}))
    {
      res.status(401).send({message: "User already exists! Try another user name."})
    } else{
      const newUser = {
      name: name
      }
      const user = await User.create(newUser)

      return res.status(201).send(user);
    }
    
  } catch(error){
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

router.get('/getall', async (req, res) => {
  try{
    const users = await User.find({})

    return res.status(200).send({
      count: users.length,
      data: users
    });

  } catch(error){
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

router.get('/:name', async (req, res) => {
  try{
    if(req.params.name === ''){
      return res.status(400).send({
        message: 'Send required name field!'
      })
    }

    const {name} = req.params

    const user = await User.findOne({ name })
    
    return res.status(200).send(user);

  } catch(error){
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

router.put('/:name/:highScore', async (req, res) => {
  try{
    if(!req.params.name || !req.params.highScore){
      return res.status(400).send({
        message: 'Send required name and highscore field!'
      })
    }

    const {name} = req.params
    
    const result = await User.findOneAndUpdate({ name }, req.params, {new: true})

    if(!result){
      return res.status(404).json({
        message: 'User not found'
      })
    }else return res.status(200).send(result);

  } catch(error){
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

router.delete('/:id', async (req, res) => {
  try{

    const {id} = req.params

    const result = await User.findByIdAndDelete(id);

    if(!result){
      return res.status(404).json({message: 'User not found'})
    }

    return res.status(200).send({ message: 'User deleted succesfully'});

  } catch(error){
    console.log(error.message)
    res.status(500).send({message: error.message});
  }
})

export default router