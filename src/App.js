import React, { useState, useEffect } from 'react';
import './App.css';

// Componentes principales de la aplicación
import Carrucel from './componentes/elementos/ElementoCarrucel.js';
import Catalogo from './componentes/vistas/VistaACatalogo.js';
import Footer from './componentes/elementos/ElementoFooter.js';
import ElementoNavProductos from './componentes/elementos/ElementoNavProductos.js';
import FiltroPrecio from './componentes/elementos/FiltroPrecio';

// Servicios API
import { productosAPI, categoriasAPI } from './services/api';

function App() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos de la base de datos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        // Cargar productos y categorías en paralelo
        const [productosData] = await Promise.all([
          productosAPI.getAll(),
          categoriasAPI.getAll()
        ]);

        setProductos(productosData);
        setError(null);
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('Error al cargar los datos. Verifica que el servidor esté corriendo.');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const handleAgregarAlCarrito = (productoAgregado) => {
    setCarrito((prev) => {
      // Un producto es único por su ID y su color
      const productoExistente = prev.find(
        (item) => item.id === productoAgregado.id && item.color === productoAgregado.color
      );

      if (productoExistente) {
        // Si ya existe, actualizamos su cantidad
        return prev.map((item) =>
          item.id === productoAgregado.id && item.color === productoAgregado.color
            ? { ...item, cantidad: item.cantidad + productoAgregado.cantidad }
            : item
        );
      } else {
        // Si no existe, lo añadimos al carrito
        return [...prev, productoAgregado];
      }
    });
    alert(`Se añadieron ${productoAgregado.cantidad} "${productoAgregado.nombre}" (${productoAgregado.color}) al carrito.`);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const actualizarCantidad = (index, nuevaCantidad) => {
    setCarrito((prev) => 
      prev.map((item, i) => 
        i === index ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  // Obtener categorías únicas de los productos
  const categoriasUnicas = ['Todos', ...new Set(productos.map(p => p.categoria_nombre))];

  // Filtrar productos por categoría
  let productosMostrados = categoriaSeleccionada === 'Todos'
    ? productos
    : productos.filter((p) => p.categoria_nombre === categoriaSeleccionada);

  // Ordenar productos
  if (sortBy === 'price-asc') {
    productosMostrados.sort((a, b) => a.precio - b.precio);
  } else if (sortBy === 'price-desc') {
    productosMostrados.sort((a, b) => b.precio - a.precio);
  }

  if (loading) {
    return (
      <div className="App">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem'
        }}>
          Cargando catálogo...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ color: 'red', fontSize: '1.2rem' }}>{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '10px 20px', fontSize: '1rem' }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <Carrucel />
        <ElementoNavProductos onSelectCategory={setCategoriaSeleccionada} categorias={categoriasUnicas} />
        <FiltroPrecio setSortBy={setSortBy} />
      </header>

      <main>
        <Catalogo
          categoriaSeleccionada={categoriaSeleccionada}
          productos={productosMostrados}
          carrito={carrito}
          agregarAlCarrito={handleAgregarAlCarrito}
          vaciarCarrito={vaciarCarrito}
          actualizarCantidad={actualizarCantidad}
          eliminarDelCarrito={eliminarDelCarrito}
        />
      </main>

      <Footer />
      <BotonWhatsapp />
    </div>
  );
}

export default App;

