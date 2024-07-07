import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Estilo.css';

const PostItApp = () => {
    const [notas, setNotas] = useState(JSON.parse(localStorage.getItem('notas')) || []);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [importante, setImportante] = useState(false);

    useEffect(() => {
        localStorage.setItem('notas', JSON.stringify(notas));
    }, [notas]);

    const agregarNota = () => {
        if (!descripcion) {
            alert('La descripción es obligatoria');
            return;
        }
        const nuevaNota = { titulo, descripcion, importante };
        setNotas([...notas, nuevaNota]);
        setTitulo('');
        setDescripcion('');
        setImportante(false);
    };

    const eliminarNota = (index) => {
        setNotas(notas.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Post It Simulator!</h1>
            <div className="form-group">
                <input
                    type="text"
                    name="titulo"
                    className="form-control"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>
            <div className="form-group">
                <textarea
                    name="descripcion"
                    className="form-control"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
            </div>
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    name="importante"
                    className="form-check-input"
                    checked={importante}
                    onChange={(e) => setImportante(e.target.checked)}
                />
                <label className="form-check-label">Importante</label>
            </div>
            <button className="btn btn-primary" onClick={agregarNota}>Agregar Nota</button>
            <div className="mt-4">
                <div className="d-flex flex-wrap">
                    {notas.map((nota, index) => (
                        <div key={index} className={`post-it ${nota.importante ? 'important' : ''}`}>
                            <h5>{nota.titulo}</h5>
                            <p>{nota.descripcion}</p>
                            <span className="delete-btn" onClick={() => eliminarNota(index)}>X</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostItApp;

