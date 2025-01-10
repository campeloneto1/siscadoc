import ScdInput from "@/components/ScdInput/ScdInput";
import SdcSelect from "@/components/SdcSelect/SdcSelect";
import { Button } from "@/components/ui/button";
import { Field, Formik } from "formik";
import { Form } from "react-router-dom";
import * as Yup from "yup";
import { PerfisAPI, UsuariosAPI } from "@/api";
import { useEffect, useState } from "react";
import { PerfisResponse } from "@/interfaces/Perfil";
import showToast from "@/utils/toast";

interface SignupFormValuesProps {
  nome: string;
  cpf: string;
  email: string;
  telefone1: string;
  telefone2?: string | null;
  perfil_id: string;
}

const SdcUsuariosForm = () => {
  const [perfis, setPerfis] = useState<PerfisResponse>();
  const SignupSchema = Yup.object().shape({
    nome: Yup.string()
      .min(5, "Mínimo 5 caracteres") // Corrigido para 5 caracteres
      .max(100, "Máximo 100 caracteres") // Corrigido para 100 caracteres
      .required("Nome é obrigatório"), // Alterado para refletir o campo "nome"

    cpf: Yup.string()
      .length(11, "O CPF deve ter 11 caracteres") // Validação para exatos 11 caracteres
      .required("CPF é obrigatório"),

    email: Yup.string()
      .email("E-mail inválido") // Validação de formato de e-mail
      .required("E-mail é obrigatório"),

    telefone1: Yup.string()
      .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos") // Regex para 10 ou 11 dígitos
      .required("Telefone é obrigatório"),

    telefone2: Yup.string()
      .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos") // Regex para 10 ou 11 dígitos
      .nullable(), // Permite ser opcional, caso não haja telefone2

    perfil_id: Yup.number()
      .required("Perfil é obrigatório")
      .positive("O perfil selecionado deve ser válido") // Verifica se é um número positivo (o id do perfil)
      .integer("O perfil selecionado deve ser um número inteiro"),
  });

  const submitForm = async (values: SignupFormValuesProps) => {
    try {
      console.log("form submit", values);
      const response = await UsuariosAPI.store(values);
      showToast(response.message, "success");
    } catch (e: any) {
      showToast(e.message, "error");
    }
  };

  const getPerfis = async () => {
    const all = true;
    const response = await PerfisAPI.index(0, "", all);
    setPerfis(response);
  };

  useEffect(() => {
    if (!perfis) {
      getPerfis();
    }
  }, [perfis]);

  return (
    <Formik
      initialValues={{
        nome: "",
        cpf: "",
        email: "",
        telefone1: "",
        telefone2: "",
        perfil_id: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        console.log("submit");
        submitForm(values);
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <div className="w-4/12">
                <Field
                  className="w-4/12"
                  name="nome"
                  label="Nome"
                  id="nome"
                  placeholder="Informe o nome"
                  required={true}
                  type="text"
                  component={ScdInput}
                  meta={{ error: errors.nome, touched: touched.nome }}
                  maxLength={100}
                  minLength={5}
                />
              </div>
              <div className="w-2/12">
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
              </div>
              <div className="w-2/12">
                <Field
                  name="perfil_id"
                  label="Perfil"
                  id="perfil_id"
                  placeholder="Selecione um perfil"
                  required={true}
                  component={SdcSelect}
                  itens={perfis ? perfis.data : []}
                  meta={{
                    error: errors.perfil_id,
                    touched: touched.perfil_id,
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-3/12">
                <Field
                  name="email"
                  label="E-mail"
                  id="email"
                  placeholder="Informe um e-mail"
                  required={true}
                  type="email"
                  component={ScdInput}
                  meta={{
                    error: errors.email,
                    touched: touched.email,
                  }}
                />
              </div>
              <div className="w-2/12">
                <Field
                  name="telefone1"
                  label="Telefone 1"
                  id="telefone1"
                  placeholder="Informe um telefone"
                  required={true}
                  type="text"
                  component={ScdInput}
                  meta={{
                    error: errors.telefone1,
                    touched: touched.telefone1,
                  }}
                />
              </div>
              <div className="w-2/12">
                <Field
                  name="telefone2"
                  label="Telefone 2"
                  id="telefone2"
                  placeholder="Informe um telefone"
                  required={false}
                  type="text"
                  component={ScdInput}
                  meta={{
                    error: errors.telefone2,
                    touched: touched.telefone2,
                  }}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!isValid}>
              Salvar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SdcUsuariosForm;
