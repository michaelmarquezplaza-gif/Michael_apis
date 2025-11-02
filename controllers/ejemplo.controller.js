import Ejemplo from "../models/ejemplo.model.js";
import mongoose from "mongoose";
import express from 'express'; 

export const getAllEjemplos = async (req, res) =>{
    console.log('obtiene todos los ejemplos')
    try {
        const ejemplos = await Ejemplo.find({},{__v:0});
        if(ejemplos.length === 0){
            return res.status(404).json({
                msg: 'No se encontraron ejemplos'
            })
        }
        return res.status(202).json({
            ejemplos
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Error al tener los ejemplos'
        })
    }};



    export const getEjemploById = async (req, res) =>{
        console.log('obtiene un ejemplo por id')
        const id =req.params.id;
        try {
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({
                    msg: 'El id no es valido'
                })
            
        }const ejemplo = await Ejemplo.findById(id);
        if(!ejemplo){
            return res.status(404).json({
                msg: 'No se encontro el ejemplo por id'
            })
        }
        return res.status(200).json({
            ejemplo
        });
    
    }catch (error) {
            res.status(500).json({
                msg: 'Error al tener el ejemplo por id'
            })
        }
};
export const postEjemplo = async (req, res) => {
  console.log("Post ejemplo");
  const body = req.body;
  const ejemplo = new Ejemplo(body);


    try {
        const validationError = ejemplo.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(err => err.message);
            return res.status(400).json({
                errors: errorMessages
            });
        }
        await ejemplo.save();
        return res.status(201).json({
            msg: 'Ejemplo guardado correctamente',
            ejemplo
        });
    }catch (error){
        return res.status(400).json({
            msg: 'Error dal guardar el ejemplo',
        });
    }
};

export const putEjemplo = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'El id no es valido'
            });
        }
        const ejemplo = await Ejemplo.findByIdAndUpdate(id, body, {new: true, runValidators: true});
        if (!ejemplo) {
            return res.status(404).json({
                msg: 'No se encontro el ejemplo por id'
            });
        }
        return res.status(200).json({
            msg: 'Ejemplo actualizado correctamente',
            ejemplo
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar el ejemplo'
        });
    }
};


export const deleteEjemplo = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'El id no es válido' });
        }

        const ejemplo = await Ejemplo.findByIdAndDelete(id);
        if (!ejemplo) {
            return res.status(404).json({ msg: 'No se encontró el ejemplo por id' });
        }

        return res.status(200).json({
            msg: 'Ejemplo eliminado correctamente',
            ejemplo
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar el ejemplo'
        });
    }
};
