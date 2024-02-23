import { FeatuedVideosSection, LandingSection, PackagesSection, PackageTypesSection, ProjectsSection,} from '../components';
import Footer from '../components/Footer';

export default function Home() {
  
  return (
    <div className="">

      
      <LandingSection/>
      <FeatuedVideosSection/>
      {/* <PackageTypesSection/> */}
      <PackagesSection/>
   

      <Footer/>
 

    </div>
  );
}

