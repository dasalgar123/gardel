// src/componentes/elementos/Carrito.js
import React, { useState } from 'react';
import './../css/carrito.css'; // Importamos el nuevo CSS

const ElementoCarrito = ({ items, vaciarCarrito, actualizarCantidad, eliminarDelCarrito }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    correo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calcularTotal = () => {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const handleCambiarCantidad = (index, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    if (actualizarCantidad) {
      actualizarCantidad(index, nuevaCantidad);
    }
  };

  const handleEliminarProducto = (index) => {
    if (eliminarDelCarrito) {
      eliminarDelCarrito(index);
    }
  };

  const handleComprar = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.telefono || !formData.direccion) {
      alert('Por favor, completa los campos de nombre, teléfono y dirección.');
      return;
    }
    
    if (items.length === 0) {
      alert('Tu carrito está vacío. Añade productos antes de realizar la compra.');
      return;
    }

    let mensaje = `¡Hola! Quisiera hacer un pedido con los siguientes datos:\n\n`;
    mensaje += `*Cliente:* ${formData.nombre}\n`;
    mensaje += `*Teléfono:* ${formData.telefono}\n`;
    mensaje += `*Dirección de Entrega:* ${formData.direccion}\n`;
    if (formData.correo) {
      mensaje += `*Correo:* ${formData.correo}\n`;
    }
    mensaje += `\n*--- Productos ---*\n`;

    let total = 0;
    items.forEach(item => {
      mensaje += `- ${item.nombre}`;
      if (item.color) mensaje += ` (${item.color})`;
      if (item.talla) mensaje += ` - Talla: ${item.talla}`;
      mensaje += ` (x${item.cantidad}) - $${(item.precio * item.cantidad).toLocaleString('es-CO')}\n`;
      total += item.precio * item.cantidad;
    });

    mensaje += `\n*Total del Pedido: $${total.toLocaleString('es-CO')}*`;
    
    const numeroAdmin = '573216798086';
    const urlWhatsapp = `https://wa.me/${numeroAdmin}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(urlWhatsapp, '_blank');

    // Opcional: limpiar carrito y formulario después de enviar
    vaciarCarrito();
    setFormData({ nombre: '', telefono: '', direccion: '', correo: '' });
  };

  return (
    <div className="canasta-pedido">
      <div className="canasta-header">
        <h3>🛒 Canasta de Pedido</h3>
        {items.length > 0 && (
          <div className="canasta-resumen">
            <span className="total-items">{items.length} productos</span>
            <span className="total-precio">Total: ${calcularTotal().toLocaleString('es-CO')}</span>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="canasta-vacia">
          <div className="icono-vacia">🛍️</div>
          <p>Tu canasta está vacía</p>
          <p className="texto-secundario">Agrega productos para comenzar tu pedido</p>
        </div>
      ) : (
        <div className="canasta-productos">
          {items.map((item, index) => (
            <div key={index} className="producto-carrito">
              <div className="producto-info">
                {item.imagen && (
                  <img src={item.imagen} alt={item.nombre} className="producto-imagen-mini" />
                )}
                <div className="producto-detalles">
                  <h4 className="producto-nombre">{item.nombre}</h4>
                  <div className="producto-opciones">
                    {item.color && <span className="opcion-seleccionada">Color: {item.color}</span>}
                    {item.talla && <span className="opcion-seleccionada">Talla: {item.talla}</span>}
                  </div>
                  <p className="producto-precio-unitario">${item.precio.toLocaleString('es-CO')} c/u</p>
                </div>
              </div>
              
              <div className="producto-controles">
                <div className="cantidad-controles">
                  <button 
                    onClick={() => handleCambiarCantidad(index, item.cantidad - 1)}
                    className="btn-cantidad"
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <span className="cantidad-display">{item.cantidad}</span>
                  <button 
                    onClick={() => handleCambiarCantidad(index, item.cantidad + 1)}
                    className="btn-cantidad"
                  >
                    +
                  </button>
                </div>
                
                <div className="producto-total">
                  ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                </div>
                
                <button 
                  onClick={() => handleEliminarProducto(index)}
                  className="btn-eliminar"
                  title="Eliminar producto"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          
          <div className="canasta-acciones">
            <button onClick={vaciarCarrito} className="btn-vaciar">
              Vaciar Canasta
            </button>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <form onSubmit={handleComprar} className="carrito-form">
          <h4>📋 Datos para el Envío</h4>
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo*</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono*</label>
            <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección de Envío*</label>
            <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico (Opcional)</label>
            <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleInputChange} />
          </div>
          
          <div className="resumen-final">
            <div className="total-final">
              <strong>Total a Pagar: ${calcularTotal().toLocaleString('es-CO')}</strong>
            </div>
            <button type="submit" className="btn-whatsapp">
              📱 Realizar Pedido por WhatsApp
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ElementoCarrito;
