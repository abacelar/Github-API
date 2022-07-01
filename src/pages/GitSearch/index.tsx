import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';
import { Url } from 'url';
import ResultLink from 'components/ResultLink';
import ResultLoader from './ResultLoader';

type FormData = {
  usuario: string;
};

type User = {
  avatar_url: string;
  html_url: string;
  name: string;
  location: string;
  followers: string;
};

const GitSearch = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    usuario: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    axios
      .get(`https://api.github.com/users/${formData.usuario}`)
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setUser(undefined);
      });
  };

  return (
    <div className="git-search-container">
      <div className="container search-container">
        <h1>Encontre um perfil Github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
      {user && (isLoading ? <ResultLoader /> : (
        <>
          <div className="container user-main-container">
            <div className="container user-container">
              <h1>Informações</h1>
              <ResultLink title="Perfil:" description={user?.html_url} />
              <ResultCard title="Seguidores:" description={user?.followers} />
              <ResultCard title="Localidade:" description={user?.location} />
              <ResultCard title="Nome:" description={user?.name} />
            </div>
            <div className="avatar-container">
              <img src={user.avatar_url} alt="avatar" />
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default GitSearch;
