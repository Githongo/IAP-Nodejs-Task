const db = require('../../models');
const express = require('express');



const router = express.Router();
    
//Creates new Student
router.post('/',(req, res, next)=>{


    if (req.body.Name == null ||req.body.year == null ||req.body.email == null ||req.body.address == null ||req.body.course == null ) 
    {
        res.status(404).json({message: 'Some fields are missing in the data! Record creation operation failed!'});

    }else{
    
        db.student.create({
            Name: req.body.Name,
            year: req.body.year,
            email: req.body.email,
            address: req.body.address,
            course: req.body.course,
            isActive: req.body.isActive
        })
        .then(result=>{
            console.log(result);
        res.status(201).json({
            message: 'Student has been created successfully!',
            user: result
        });
        }).catch(err =>{
            console.log(err);
        res.status(500).json({
            error:err.errors
        });

        });
    }

});

//gets All Students
router.get('/',(req, res, next)=>{
    db.student.findAll()
    .then(docs =>{
        const response = {
            count: docs.length,
            students: docs.map(doc => {
                return{
                    id: doc.id,
                    name: doc.Name,
                    email: doc.email,
                    year:doc.year,
                    course:doc.course,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/api/v1/student/'+doc.id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        
    });
   

});

//Gets specific student
router.get('/:studentId',(req,res,next)=>{

    const id = req.params.studentId;
    
    db.student.findAll({
        where: {
          id: id
        }
      })
    .then(doc => {
        console.log(doc);
        if(doc.length != 0){
        res.status(200).json(doc);
        }else{
            res.status(404).json({message: 'The ID provided does not exist in the records!'});
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err,message: id+' is not a valid ID'});
    });

});

//Updates specific student
router.put('/:studentId',(req,res,next)=>{
    const id = req.params.studentId;
    //adding functionality to update one or multiple items
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    

    db.student.update(updateOps,{
        where: {
        id: id
      }})
    .then(result =>{
        console.log(result[0]);
        if (result[0] == 1) {
            console.log(updateOps);
            res.status(200).json({
                message:'student record updated succefully',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/api/v1/student/'+id
                }
        });
        }else{
            res.status(404).json({message: 'The ID provided does not exist'}); 
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err,
            message:'Update operation was not successful!'});
    });

    
});


//Deletes a particular student
router.delete('/:studentId',(req,res,next)=>{
    const id = req.params.studentId;

    db.student.destroy({
        where: {
          id: id
        }
      })
    .then((result) => {
        console.log(result);

        if (result[0] == 1) {
            res.status(200).json({
                message: 'Student deleted operation succesfull!',
                result
            });
        }else{
            res.status(404).json({message: 'The Identifier provided does not exist'+result.length});

        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err,
            message:'Student delete operation failed'
        });
    });

    
});
module.exports = router;