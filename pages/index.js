import { useState, useEffect } from "react";

export default function Home() {
  const [inventario, setInventario] = useState([]);
  const [form, setForm] = useState({
    modelo: "", color: "", capacidad: "", imei: "", condicion: "Usado",
    accesorios: "", costo: "", estado: "Disponible", fecha: "", notas: ""
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("inventario") || "[]");
    setInventario(data);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const guardar = () => {
    const nuevo = { id: Date.now(), ...form };
    const actualizado = [...inventario, nuevo];
    setInventario(actualizado);
    localStorage.setItem("inventario", JSON.stringify(actualizado));
    setForm({ modelo: "", color: "", capacidad: "", imei: "", condicion: "Usado", accesorios: "", costo: "", estado: "Disponible", fecha: "", notas: "" });
  };

  const marcarVendido = (id) => {
    const actualizado = inventario.map(item =>
      item.id === id ? { ...item, estado: "Vendido" } : item
    );
    setInventario(actualizado);
    localStorage.setItem("inventario", JSON.stringify(actualizado));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Inventario CELMX</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
        {["modelo", "color", "capacidad", "imei", "condicion", "accesorios", "costo", "estado", "fecha", "notas"].map((campo) => (
          <input key={campo} placeholder={campo} name={campo} value={form[campo]} onChange={handleChange} />
        ))}
      </div>
      <button onClick={guardar} style={{ marginTop: 10 }}>Agregar</button>

      <h2 style={{ marginTop: 40 }}>Inventario</h2>
      <table border="1" cellPadding="5" style={{ width: "100%", marginTop: 10 }}>
        <thead>
          <tr>
            <th>Modelo</th><th>Color</th><th>Capacidad</th><th>IMEI</th>
            <th>Condición</th><th>Accesorios</th><th>Costo</th><th>Estado</th><th>Fecha</th><th>Notas</th><th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map(item => (
            <tr key={item.id}>
              <td>{item.modelo}</td>
              <td>{item.color}</td>
              <td>{item.capacidad}</td>
              <td>{item.imei}</td>
              <td>{item.condicion}</td>
              <td>{item.accesorios}</td>
              <td>${item.costo}</td>
              <td>{item.estado}</td>
              <td>{item.fecha}</td>
              <td>{item.notas}</td>
              <td>
                {item.estado !== "Vendido" && (
                  <button onClick={() => marcarVendido(item.id)}>Marcar como vendido</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}