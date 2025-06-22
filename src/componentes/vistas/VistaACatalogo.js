import React from 'react';
import Tarjeta from '../elementos/ElementoTarjeta';
import Carrito from '../elementos/ElementoCarrito';
import ElementoTitulo from '../elementos/ElementoTitulo';
import '../css/catalogo.css';

const VistaACatalogo = ({
  categoriaSeleccionada,
  productos,
  carrito,
  agregarAlCarrito,
  vaciarCarrito,
}) => {
  return (
    <div className="catalogo-container">
      <div className="catalogo-productos">
        <ElementoTitulo texto="Catálogo de Ropa" />
        <h2>{categoriaSeleccionada}</h2>
        <div className="catalogo-grid">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <Tarjeta
                key={producto.id}
                id={producto.id}
                imagen={producto.imagen || producto.imagen_url}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                colores={producto.colores ? producto.colores.split(',').map(c => c.trim()) : []}
                tallas={producto.tallas ? producto.tallas.split(',').map(t => t.trim()) : []}
                onAgregar={(opciones) => agregarAlCarrito({ 
                  ...producto, 
                  ...opciones,
                  nombre: producto.nombre,
                  precio: producto.precio
                })}
              />
            ))
          ) : (
            <p>No hay productos que coincidan con tu búsqueda.</p>
          )}
        </div>
      </div>

      <Carrito items={carrito} vaciarCarrito={vaciarCarrito} />
    </div>
  );
};

export default VistaACatalogo;
