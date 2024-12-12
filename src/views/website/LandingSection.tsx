import Button from '../../components/schema/Button';
import { Link as ScrollLink } from "react-scroll";

const LandingSection = () => {
  return (
    <section id="landing">
      <div className="mt-20 h-auto pb-5">
        <div className="flex flex-row justify-between items-center pt-20 space-x-10 container max-sm:flex-col max-sm:space-x-0">
          <div className="flex flex-col justify-between items-start flex-shrink-0 w-1/2 max-sm:w-10/12 space-y-8 max-sm:items-center max-sm:space-y-3">
            <h2 className="text-[#2B2B2B] text-5xl font-bold max-sm:text-3xl max-sm:text-center">
              Enjoy the newest and most powerful <span className="text-primary">SMS</span> Messaging platform.
            </h2>
            <p className="text-[#525252] text-lg font-medium max-sm:text-lg max-sm:text-center">A messaging system with a new concept that gives everything it needs in the world of messaging.</p>
            <div className='flex flex-row items-center space-x-3 max-sm:flex-col max-sm:space-y-3'>
              <ScrollLink
                to="prices"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Button className='px-6'>Discover the services</Button>
              </ScrollLink>
              <ScrollLink
                to="services"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <Button className='px-6 border-2 border-primary bg-transparent dark:text-primary hover:text-white hover:bg-primary font-medium'>Prices Plans</Button>
              </ScrollLink>
            </div>
          </div>
          <div className='flex-shrink-0 w-3/5 max-sm:mt-10 max-sm:w-full'>
            {/* <img className="image-float duration-300" src={LandingImg} alt="Landing" loading='lazy' /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
