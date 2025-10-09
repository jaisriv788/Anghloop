import Hero from "../components/pool/Hero";
import Order from "../components/pool/Orders";
import FriendAddres from "../components/pool/FriendAddress";
import Faq from "../components/pool/Faq";

function Pool({ showModal }) {
  return (
    <>
      <Hero showModal={showModal} />
      <Order />
      <FriendAddres />
      <Faq />
    </>
  );
}

export default Pool;
