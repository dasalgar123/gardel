// src/componentes/elementos/Tarjeta.js
import React, { useState } from 'react';
import '../css/tarjeta.css'; // Importa el CSS

const colorMap = {
  'Negro': '#000000',
  'Blanco': '#FFFFFF',
  'Gris': '#808080',
  'Azul marino': '#000080',
  'Rojo': '#FF0000',
  'Verde': '#008000',
  'Azul': '#0000FF',
  'Rosado': '#FFC0CB',
  'Lila': '#C8A2C8'
};

const ElementoTarjeta = ({ 
  id, 
  imagen, 
  nombre, 
  descripcion, 
  precio, 
  colores = [], 
  tallas = [],
  onAgregar 
}) => {
  const [cantidad, setCantidad] = useState(1);
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const [tallaSeleccionada, setTallaSeleccionada] = useState(null);

  const handleAgregar = () => {
    if (!colorSeleccionado) {
      alert('Por favor, selecciona un color antes de agregar el producto.');
      return;
    }
    if (!tallaSeleccionada) {
      alert('Por favor, selecciona una talla antes de agregar el producto.');
      return;
    }
    onAgregar({ 
      id, 
      cantidad, 
      color: colorSeleccionado,
      talla: tallaSeleccionada,
      precio_unitario: precio,
      imagen: imagen
    });
  };

  return (
    <div className="tarjeta">
      {/* Contenedor para la imagen y el contenido que aparece al pasar el cursor */}
      <div className="tarjeta-visual-container">
        <img src={imagen} alt={nombre} className="tarjeta-img" />
        <div className="tarjeta-overlay">
          <h3 className="tarjeta-titulo">{nombre}</h3>
          
          <div className="tarjeta-opciones">
            <p>Color:</p>
            <div className="opciones-container">
              {colores.map((color) => (
                <div
                  key={color}
                  className={`color-dot ${colorSeleccionado === color ? 'selected' : ''}`}
                  style={{ backgroundColor: colorMap[color] || '#ccc' }}
                  onClick={() => setColorSeleccionado(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {tallas.length > 0 && (
            <div className="tarjeta-opciones">
              <p>Talla:</p>
              <div className="opciones-container">
                {tallas.map((talla) => (
                  <div
                    key={talla}
                    className={`talla-option ${tallaSeleccionada === talla ? 'selected' : ''}`}
                    onClick={() => setTallaSeleccionada(talla)}
                  >
                    {talla}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="tarjeta-opciones">
            <p>Cantidad:</p>
            <div className="cantidad-container">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
              <input type="number" value={cantidad} readOnly />
              <button onClick={() => setCantidad(cantidad + 1)}>+</button>
            </div>
          </div>

          <p className="tarjeta-precio">${(precio * cantidad).toLocaleString('es-CO')}</p>

          <button 
            onClick={handleAgregar} 
            className="tarjeta-btn" 
            disabled={!colorSeleccionado || (tallas.length > 0 && !tallaSeleccionada)}
          >
            Agregar al Pedido
          </button>
        </div>
      </div>

      {/* Contenedor para la descripción (siempre visible) */}
      <div className="tarjeta-info-permanente">
        <p className="tarjeta-descripcion">{descripcion}</p>
      </div>
    </div>
  );
};

export default ElementoTarjeta;
