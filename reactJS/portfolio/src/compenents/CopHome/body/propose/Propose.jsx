import Left from './left';
import Right from './Right';
import Image1 from "../../../../assets/ImageHome/image1.jpg";
import Image2 from "../../../../assets/ImageHome/image2.jpg";
import Image3 from "../../../../assets/ImageHome/image3.jpg";
import Image4 from "../../../../assets/ImageHome/image4.jpg";
import Image5 from "../../../../assets/ImageHome/image5.jpg";


function Propose() {
  return (
      <div className='max-w-6xl mx-auto px-4 space-y-8 mb-16'>
        <Left
            title="Notre Vision"
            content="Découvrez notre approche innovante pour transformer vos idées en réalité digitale."
            source={Image1}
        />
        <Right
            title="Services Clés"
            content="Une gamme complète de solutions sur mesure pour répondre à tous vos besoins technologiques."
            source={Image2}
        />
        <Left
            title="Notre Équipe"
            content="Des experts passionnés dédiés à l'excellence et à la réussite de vos projets."
            source={Image5}
        />
      </div>
  )
}

export default Propose;