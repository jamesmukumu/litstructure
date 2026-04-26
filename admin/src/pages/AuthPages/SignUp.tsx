import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Register Admin|Litstructure"
        description="Create Admin for litstructure"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
