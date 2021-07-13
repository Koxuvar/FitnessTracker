const router = require('express').Router();
const Workout = require('../../models/Workout');

router.get('/workouts', async (req, res) =>
{
    try
    {
        const wkt = await Workout.aggregate(
            [
                {
                    $addFields:
                    {
                        totalDuration: 
                        {
                            $sum: '$exercises.duration'
                        }
                    }
                }
            ]
        );

        if(!wkt)
        {
            res.status(400).json({message:'huh didnt seem to like that...'})
        }
        else
        {
            res.status(200).json(wkt);
        }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

router.get('/workouts/range', (req, res) =>
{
    try
    {
        Workout.find({})
        .sort({ day: -1})
        .poulate('exercises')
        .then((wkt) =>
        {
            res.json(wkt);
        });
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

router.post('/workouts', async (req, res) =>
{
    try{

        console.log(req.body);
        const wkt = await Workout.create(req.body);

        if(!wkt)
        {
            res.status(400).json({message:'huh didnt seem to like that...'})
        }
        else
        {
            res.status(200).json(wkt);
        }
    }
    catch(err)
    {
        res.status(500).json({message: err});
    }
});

router.put('/workouts/:id', async (req, res) =>
{
    try
    {
        const wkt = await Workout.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $inc: {totalDuration: req.body.duration},
                $push: {exercises: req.body}
            });  

        if(!wkt)
        {
            res.status(400).json({message:'huh didnt seem to like that...'})
        }
        else
        {
            res.status(200).json(wkt);
        }
    }
    catch(err)
    {
        res.status(500).json({message: err});
    }
});

module.exports = router;


