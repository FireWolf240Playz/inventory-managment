import Heading from "../ui/Heading.tsx";
import Row from "../ui/Row.tsx";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm.tsx";
import UpdateUserPasswordForm from "../features/authentication/UpdateUserPasswordForm.tsx";
import { useWindowSize } from "@uidotdev/usehooks";

function Account() {
  const { width } = useWindowSize();
  return (
    <>
      <Heading as={width !== null && width < 490 ? "h2" : "h1"}>
        Update your account
      </Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdateUserPasswordForm />
      </Row>
    </>
  );
}

export default Account;
