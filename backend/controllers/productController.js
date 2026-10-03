const Product=require('../model/product');
const cloudinary=require('../config/cloudinary');

const getProducts=async (req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductById=async (req,res)=>{
    try{
        const productId=req.params.id;
        const productById=await Product.findById(productId);
        if(!productById){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(productById);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createProduct=async (req,res)=>{
    try{
     const {name,description,price,category,stock}=req.body;
     let imageUrl='';
     if(req.file){
        const result=await cloudinary.uploader.upload(req.file.path);
        imageUrl=result.secure_url;
     }
     const product=new Product({
        name,
        description,
        price,
        category,
        stock,
        imageUrl
     });
     const savedProduct=await product.save();
     res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateProduct=async (req,res)=>{
    try{
       const {name,description,price,category,stock}=req.body;
       const product= await Product.findById(req.params.id);
       if(product){
        product.name=name || product.name;
        product.description=description || product.description;
        product.price=price || product.price;
        product.category=category || product.category;
        product.stock=stock || product.stock;
        if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path);
            product.imageUrl=result.secure_url;
        }  
        const updatedProduct=await product.save();  
        res.status(200).json(updatedProduct);    
       }
       else{
        res.status(404).json({message:'Product not found'});
       }
      
        
    }
    catch(error){
        res.status(500).json({ message: 'Server error' });
    }   
};

const deleteProduct=async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.status(200).json({ message: 'Product deleted successfully' });
        }
        else{
            res.status(404).json({ message: 'Product not found' });
        }
       }
     catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports={
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};