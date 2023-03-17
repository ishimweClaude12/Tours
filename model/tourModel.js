const express = require('express');
const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        maxLength: [20, ' A tour must have at leas 8 characters.'], 
        minlength: [4, ' A tour name must have atleast 4 characters...']
    } ,
    slug: {
        type: String

    } , 
    duration:{
        type: Number, 
        require: [true, 'A Tour Must have a duration']
    },
    maxGroupSize: {
        type: Number, 
        required: [true, ' A tour must have a group size']
    }, 
    difficulty: {
        type: String, 
        required: [true, ' a tour must have  a difficulty'], 
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either : easy, medium or difficult'
        }
    }, 
    ratingsAverage: {
        type : Number, 
        default: 4.5, 
        // min : [1, 'Rating must be above 1.0'], 
        // max: [5, ' rating can not be above 5']
    },
    ratingsQuantity: {
        type: Number, 
        default : 8
    }, 

    price:{
        type: Number, 
        default:  [true, 'please Enter a valid rating']
    } ,  
    priceDiscount: Number, 
    rating: {
        type: Number, 
        default: 4.6
    }, 
    summary: {
        type: String , 
        trim : true
    }, 
    description: {
        type: String, 
        trim : true, 
        required: [true, ' A tour must have a description']
    }, 
    imageCover: {
        type: String, 
        required: [true, ' A tour must have a cover image']
    }, 
    images: [String], 
    createdAt: {
        type: Date, 
        default: Date.now()
    }, 
    startDates: [Date]
})
tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true} )
    console.log(this.slug);
    next();
})
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
