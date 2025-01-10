import ScdInput from "@/components/ScdInput/ScdInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AuthAPI } from "@/api";
import { useAuth } from "@/hooks/UseAuth";
import showToast from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/router";

interface LoginFormProps {
  cpf: string;
  password: string;
}

interface ResponseLoginProps {
  message: string;
  token: string;
  user: any;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { updateLocalUser, updateLocalToken } = useAuth();
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    cpf: Yup.string()
      .min(11, "Mínimo 11 caracteres")
      .max(11, "Máximo 11 caracteres")
      .required("CPF é obrigatório"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Senha é obrigatório"),
  });

  const submitForm = async (values: LoginFormProps) => {
    let response: ResponseLoginProps | null = null;

    try {
      response = await AuthAPI.login(values.cpf, values.password);
      if (response && response.token && response.user) {
        updateLocalToken(response.token);
        updateLocalUser(response.user);
        navigate(ROUTES.HOME);
      } else {
        showToast("Usuário ou senha inválido!", "error");
      }
    } catch (e: any) {
      showToast(e, "error");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Siscadoc</CardTitle>
          <CardDescription>
            Informe seu usuário e senha para fazer login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              cpf: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              submitForm(values);
            }}
          >
            {({ errors, touched, isValid }) => (
              <Form>
                <div className="flex flex-col gap-6">
                  <Field
                    name="cpf"
                    label="CPF"
                    id="cpf"
                    placeholder="CPF"
                    required={true}
                    type="text"
                    component={ScdInput}
                    meta={{ error: errors.cpf, touched: touched.cpf }}
                    maxLength={11}
                    minLength={11}
                  />

                  <Field
                    name="password"
                    label="Senha"
                    id="password"
                    placeholder="Senha"
                    required={true}
                    type="password"
                    component={ScdInput}
                    meta={{
                      error: errors.password,
                      touched: touched.password,
                    }}
                    minLength={6}
                  />

                  <Button type="submit" className="w-full" disabled={!isValid}>
                    Entrar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
