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

router.get('/workouts/range', async (req, res) =>
{
    try
    {
        const wkt = await Workout.find({})
        .sort({ day: -1})
        .poulate('exercises');

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

router.post('/workouts', async (req, res) =>
{
    try{
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
        res.status(500).json(err);
    }
});

router.put('/workouts/:id', async (req, res) =>
{
    try
    {
        const wkt = await Workout.findByIDAndUpdate(
            {
                _id: params.id
            },
            {
                $inc: {totalDuration: body.duration},
                $push: {exercises: body}
            }
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


