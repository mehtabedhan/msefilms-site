import { LandingSection, PackagesSection, PackageTypesSection, ProjectsSection,} from '../components';
import Footer from '../components/Footer';
import LocationsSection from '../components/ProjectsSection';

export default function Home() {
  
  return (
    <div className="">

      
      <LandingSection/>
      <PackageTypesSection/>
      <PackagesSection/>
      <ProjectsSection/>
   

      <Footer/>
 

    </div>
  );
}

