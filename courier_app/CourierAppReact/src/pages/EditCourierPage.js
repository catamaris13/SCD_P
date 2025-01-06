import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourierById, updateCourier, getAllCouriers } from '../services/api';


const EditCourierForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [managerId, setManagerId] = useState(null); 
  const [couriers, setCouriers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchCourier = async () => {
      try {
        const { data } = await getCourierById(id);
        if (data) {
          setName(data.name || '');
          setEmail(data.email || '');
          setManagerId(data.manager_id || null);
        }
      } catch (err) {
        setError('Failed to load courier details.');
        console.error("Fetch error:", err);
      }
    };

    
    const fetchCouriers = async () => {
      try {
        const { data } = await getAllCouriers();
        setCouriers(data);
      } catch (err) {
        setError('Failed to load couriers.');
      }
    };

    fetchCourier();
    fetchCouriers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    
    const courierData = {
      id,
      name,
      email,
      managerId: managerId || null, 
    };

    try {
      await updateCourier(id, courierData);
      navigate('/couriers');
    } catch (err) {
      setError('Failed to update courier. Please try again.');
      console.error("Update error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Edit Courier</h2>

        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Manager:
          <select
            value={managerId || ''} 
            onChange={(e) => setManagerId(e.target.value === '' ? null : e.target.value)} 
            style={styles.select}
          >
            <option value="">No manager</option> {}
            {couriers
              .filter(courier => String(courier.id) !== String(id)) 
              .map(courier => (
                <option key={courier.id} value={courier.id}>
                  {courier.name}
                </option>
              ))}
          </select>
        </label>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Updating Courier...' : 'Update Courier'}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};


const EditCourierPage = () => {
  return <EditCourierForm />;
};


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',  
    height: '100vh',
    backgroundColor: '#f6e0fa',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    background: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  label: {
    width: '100%',
    marginBottom: '10px',
    fontSize: '16px',
    color: '#333',
    textAlign: 'left', 
  },
  select: {
    margin: '10px 0',
    padding: '12px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  input: {
    marginTop: '5px',
    padding: '12px',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    marginTop: '20px',
    width: '100%',
    backgroundColor: '#b366ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    marginTop: '15px',
    color: '#e63946',
    fontSize: '14px',
  },
};

export default EditCourierPage;
