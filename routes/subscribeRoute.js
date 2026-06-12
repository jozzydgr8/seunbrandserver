

const router = require('express').Router();
const Subscribe = require('../schema/subscribeSchema');
const validator = require('validator');
const sendEmail = require('../config/mailer');

const authenticator = require('../middleware/authenticator');


router.get('/', authenticator, async(req,res)=>{
    try{
        const data = await Subscribe.find({});
        res.status(200).json(data);
    }catch(error){
        res.status(400).json({error:error})
    }
});

router.post('/', async(req,res)=>{
   
    const {firstName, lastName, service, email} = req.body;
    if(!validator.isEmail(email)){
        return res.status(400).json({error:"invalid email"})
    }
    try{
       const exist = await Subscribe.findOne({email:email});
       if(exist){
        return res.status(400).json({error:'email already subscribed'})
       }
       const data =await Subscribe.create({email, firstName, lastName, service});
       const emailbody = {
        recipient_email:email,
        subject:`Welcome to Seun Ogunsanya's Newsletter!`,
        message:`Hi ${firstName},

        <p>Thank you for subscribing! 🚀</p>

        <p>I'm excited to welcome you to a community dedicated to transforming data into actionable insights and helping businesses thrive through data analytics, business intelligence, artificial intelligence, and intelligent automation.</p>

        <p>You’ll now receive:</p>

        <ul>
            <li>📊 Data analytics insights and best practices</li>
            <li>📈 Business intelligence tips with Power BI and Tableau</li>
            <li>🤖 AI and automation strategies for modern businesses</li>
            <li>🎓 Training resources and industry knowledge</li>
            <li>🚀 Updates on projects, case studies, and new content</li>
        </ul>

        <p>My mission is to help organizations make informed decisions, improve operational efficiency, and confidently navigate their digital transformation journey.</p>

        <p>Stay tuned for practical insights, expert guidance, and valuable resources designed to help you unlock the full potential of your data.</p>

        <p>If you ever have questions, need advice, or would like to discuss a project, simply reply to this email — I'd be happy to connect.</p>

        <p>Welcome aboard!</p>

        <p>
            Best regards,<br />
            <strong>Seun Ogunsanya</strong><br />
            Data Analytics | Business Intelligence | AI Solutions | Process Automation
        </p>`
       }
       const send = await sendEmail(emailbody);
       res.status(200).json({message:'success'});
    }catch(error){
        res.status(400).json({error:error})
    }
})

module.exports=router