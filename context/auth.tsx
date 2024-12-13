/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { UUID } from "../util/constants";
import api from "@/config/api";
import { getToken, removeToken, saveToken } from "../util/util";
import { User } from "@/types/user";

interface AuthContextProps {
  user: User;
  loading: boolean;
  getUser: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
  signIn: (username: string, password: string) => Promise<boolean | undefined>;
}

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const useAuth = (): Readonly<AuthContextProps> => {
  return React.useContext(AuthContext);
};

const AuthProvider = (props: React.PropsWithChildren) => {
  const [user, setUser] = React.useState<User>({} as User);
  const [loading, setLoading] = React.useState<boolean>(true);

  const getUser = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const token = await getToken(UUID);

      if (!token) {
        setLoading(false);
        return false;
      }

      const response = await api.post("/auth/me", {
        uuid: token,
      });

      if (response.data) {
        setUser(response.data);
        return true;
      }

      return false;
    } catch (error: any) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("/auth", {
        username,
        password,
      });

      saveToken(UUID, response.data.uuid);

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await removeToken(UUID);
      setUser({} as User);
      return true;
    } catch (error) {
      return false;
    }
  };

  const authProviderValue = React.useMemo(
    () => ({
      user,
      signIn,
      loading,
      signOut,
      getUser,
    }),
    [user, signIn, loading, signOut, getUser]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
