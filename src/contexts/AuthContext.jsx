import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// Define roles clearly
export const ROLES = {
  GERENCIA: 'Gerência', // Was 'Adm'/'Gerência'
  VENDEDOR: 'Vendedor',   // Was 'Atendente'
  TECNICO: 'Técnico',
  MASTER: 'Master',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading until session is checked

  // Check session on initial load
  const checkSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Optional: Re-validate user against DB here if needed for extra security
        // For now, trust localStorage if it exists
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking session from localStorage:", error);
      setUser(null);
      localStorage.removeItem('authUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (username, password) => {
    console.log(`Attempting login for user: ${username}`);
    try {
      // Fetch user strictly from 'sistema_usuarios'
      const { data, error: queryError } = await supabase
        .from('sistema_usuarios')
        .select('id, nome, usuario, senha, cargo') // Fetch plain text password
        .eq('usuario', username)
        .limit(1); // Ensure we only process one user if duplicates exist

      if (queryError) {
        console.error('Supabase query error during login:', queryError);
        // Provide a generic user-facing error
        throw new Error('Erro ao comunicar com o servidor.');
      }

      // Check if user was found
      if (!data || data.length === 0) {
         console.warn('User not found in sistema_usuarios for:', username); // Use warn for expected scenario
         // This is the correct user-facing error message for not found or wrong password
         throw new Error('Usuário ou senha inválidos.');
      }

      // If duplicates were somehow possible, data would be an array. Take the first.
      const userDataFromDb = data[0];
      console.log('User data fetched from sistema_usuarios (excluding password):', { id: userDataFromDb.id, nome: userDataFromDb.nome, usuario: userDataFromDb.usuario, cargo: userDataFromDb.cargo });

      // Direct plain text password comparison
      if (!userDataFromDb.senha) {
          console.error(`User ${username} found but has no password stored.`);
          throw new Error('Usuário ou senha inválidos.'); // Treat missing password as invalid
      }

      const passwordMatch = userDataFromDb.senha === password;

      if (!passwordMatch) {
        console.warn('Password comparison failed for user:', username); // Use warn for expected scenario
        throw new Error('Usuário ou senha inválidos.'); // Incorrect password
      }

      // Login successful
      console.log('Login successful for user:', username);
      // Map stored role 'Adm' to 'Gerência' and 'Atendente' to 'Vendedor' if necessary during login
       let userCargo = userDataFromDb.cargo;
       
       // Normalize cargo to handle case variations
       if (userCargo) {
         // Convert to lowercase for comparison
         const cargoLower = userCargo.toLowerCase();
         
         // Map old/alternative role names
         if (cargoLower === 'adm' || cargoLower === 'admin') userCargo = ROLES.GERENCIA;
         if (cargoLower === 'atendente') userCargo = ROLES.VENDEDOR;
         if (cargoLower === 'master') userCargo = ROLES.MASTER;
         if (cargoLower === 'gerencia' || cargoLower === 'gerência') userCargo = ROLES.GERENCIA;
         if (cargoLower === 'vendedor') userCargo = ROLES.VENDEDOR;
         if (cargoLower === 'tecnico' || cargoLower === 'técnico') userCargo = ROLES.TECNICO;
       }
       
       // Ensure all roles are correctly represented
       if (![ROLES.GERENCIA, ROLES.VENDEDOR, ROLES.TECNICO, ROLES.MASTER].includes(userCargo)) {
            console.warn(`Unknown role "${userDataFromDb.cargo}" assigned to user ${username}. Defaulting to Vendedor.`);
            userCargo = ROLES.VENDEDOR; // Or handle as an error/default role
       }


      const loggedInUserData = {
        id: userDataFromDb.id, // Use the UUID from sistema_usuarios
        nome: userDataFromDb.nome,
        usuario: userDataFromDb.usuario,
        cargo: userCargo, // Use the potentially mapped role
      };

      console.log('Login successful - User data:', loggedInUserData);
      console.log('User cargo after mapping:', userCargo);

      // Update state and localStorage synchronously
      setUser(loggedInUserData);
      localStorage.setItem('authUser', JSON.stringify(loggedInUserData)); // Persist session
      
      return loggedInUserData;

    } catch (error) {
      console.error("Login failed in AuthContext:", error.message); // Log the specific error message
      // Re-throw the error so the UI can catch and display it
      throw error;
    }
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser'); // Clear persisted session
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    checkSession,
  };

  // Display loading indicator only during the initial session check
  if (isLoading && !user && localStorage.getItem('authUser') === null) {
     return (
       <div className="flex justify-center items-center h-screen bg-background">
         <Loader2 className="h-16 w-16 animate-spin text-primary" />
       </div>
     );
  }


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};