import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import styled from "styled-components";
import Logo from "../components/Logo";

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0f172a;
`;

const LoginCard = styled.div`
  background: #1e293b;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 24rem;
  border: 1px solid #334155;
`;

const Title = styled.h2`
  color: #f8fafc;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: #f87171;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #334155;
  background-color: #0f172a;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #64748b;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await login(email, password);
    if (error) setError(error.message);
    else navigate("/admin");
  };

  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && user) {
      navigate("/admin");
    }
  }, [isLoading, user, navigate]);

  return (
    <LoginContainer>
      <Logo />
      <LoginCard>
        <Title>Autentificare Administrator</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolă"
            required
          />
          <SubmitButton type="submit">Autentificare</SubmitButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
}
