const express =require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const morgan=require('morgan');
const cors=require('cors');
const Routes = require("./routes/routes");

require('dotenv').config();
const {NODE_PORT,DATABASE_URL}=process.env;
const PORT=NODE_PORT || 8000;

const app=express();
const isdevelopement=process.env.NODE_ENV=='developemnt';
if(isdevelopement){
    app.use(morgan('dev'));
}else{
    app.use(morgan('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
if (isdevelopement) {
    // production
    // app.use(cors({ origin: CLIENT_URL, optionsSuccessStatus: 200 }));
    app.use(cors());
  }
  app.use(express.static(path.join(__dirname, "/github/build")));
app.use("/api",Routes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/github/build/index.html"));
  });
mongoose.connect(DATABASE_URL,{
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useNewUrlParser:true
}).then(()=>{
    app.listen(process.env.PORT||5000,()=>{
        console.log(`server is running on ${PORT}`);
    })
}).catch((err)=>{
    console.log(`DB connection failed ${err}`);
})