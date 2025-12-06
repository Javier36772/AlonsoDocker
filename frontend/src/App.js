import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nombreCompleto, setNombreCompleto] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
    cargarNombreCompleto();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/usuarios`);
      setUsuarios(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar usuarios: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cargarNombreCompleto = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/alonso`);
      setNombreCompleto(response.data.nombreCompleto);
    } catch (err) {
      console.error('Error al cargar nombre completo:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        // Actualizar usuario existente
        await axios.put(`${API_URL}/api/usuarios/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Crear nuevo usuario
        await axios.post(`${API_URL}/api/usuarios`, formData);
      }
      setFormData({ nombre: '', email: '' });
      cargarUsuarios();
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (usuario) => {
    setFormData({ nombre: usuario.nombre, email: usuario.email });
    setEditingId(usuario.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_URL}/api/usuarios/${id}`);
        cargarUsuarios();
        setError(null);
      } catch (err) {
        setError('Error al eliminar usuario: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Sistema de Microservicios</h1>
        <p className="developer-name">Desarrollado por: <strong>Javier Alonso</strong></p>
        {nombreCompleto && (
          <p className="endpoint-info">
            Endpoint /api/alonso: <strong>{nombreCompleto}</strong>
          </p>
        )}
      </header>

      <main className="App-main">
        <div className="container">
          <section className="form-section">
            <h2>{editingId ? '✏️ Editar Usuario' : '➕ Crear Nuevo Usuario'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  placeholder="Ingresa el nombre"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="Ingresa el email"
                />
              </div>
              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Crear'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => {
                    setEditingId(null);
                    setFormData({ nombre: '', email: '' });
                  }}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          {error && <div className="error-message">❌ {error}</div>}

          <section className="usuarios-section">
            <h2>👥 Lista de Usuarios</h2>
            <button onClick={cargarUsuarios} disabled={loading} className="refresh-btn">
              🔄 Actualizar
            </button>
            
            {loading && usuarios.length === 0 ? (
              <div className="loading">Cargando usuarios...</div>
            ) : usuarios.length === 0 ? (
              <div className="empty-state">No hay usuarios registrados</div>
            ) : (
              <div className="usuarios-grid">
                {usuarios.map((usuario) => (
                  <div key={usuario.id} className="usuario-card">
                    <div className="usuario-info">
                      <h3>{usuario.nombre}</h3>
                      <p className="email">{usuario.email}</p>
                      <p className="date">
                        Creado: {new Date(usuario.created_at).toLocaleString('es-ES')}
                      </p>
                    </div>
                    <div className="usuario-actions">
                      <button onClick={() => handleEdit(usuario)} className="edit-btn">
                        ✏️ Editar
                      </button>
                      <button onClick={() => handleDelete(usuario.id)} className="delete-btn">
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="App-footer">
        <p>Microservicios con Docker Compose - Javier Alonso</p>
        <p>Frontend: React | Backend: Node.js/Express | Base de Datos: PostgreSQL</p>
      </footer>
    </div>
  );
}

export default App;

