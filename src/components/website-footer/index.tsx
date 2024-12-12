import LogoImg from '../../assets/logo_footer.svg'
// import VisaIcon from '../../assets/visa.svg'
// import KlarnaIcon from '../../assets/klarna.svg'
// import JoudpayIcon from '../../assets/joudpay.svg'
// import MastercardIcon from '../../assets/mastercard.svg'
// import Waves from '../../assets/waves.svg'
import { SoFacebook, SoInstagram, SoLinkedIn, SoLocation2, SoMail, SoTwitter, SoYouTube } from "solom-icon";

const Footer = () => {
  return (
    <footer className="bg-[#6c35de] pb-5 relative overflow-hidden hidden">
      {/* <div className="w-full h-auto absolute flex flex-col items-center z-10">
        <img className="w-full" src={Waves} alt="WAVES" loading='lazy' />
        <img className="w-full min-sm:hidden" src={Waves} alt="WAVES" loading='lazy' />
        <img className="w-full min-sm:hidden" src={Waves} alt="WAVES" loading='lazy' />
        <img className="w-full min-sm:hidden" src={Waves} alt="WAVES" loading='lazy' />
        <img className="w-full min-sm:hidden" src={Waves} alt="WAVES" loading='lazy' />
      </div> */}
      <div className="container relative z-50">
        <div className="flex justify-between gap-10 pt-10 max-sm:flex-col max-sm:justify-center max-sm:gap-0">
          <div className="flex-shrink-0 w-1/3 space-y-10 max-sm:w-full max-sm:flex max-sm:flex-col max-sm:items-center">
            <img className="w-48" src={LogoImg} alt="Logo" />
          </div>
          <div className="flex-shrink-0 w-1/3 space-y-10 mt-10 max-sm:w-full">
          <div className="flex flex-col items-start justify-center gap-3">
            <div className="flex flex-row items-center justify-center gap-3 text-base max-sm:text-sm text-black/70">
              <SoLocation2 className="w-8 h-8 text-white" />
              <p className="text-white text-base">A62 Beechwood road, E8 3DY London United Kingdom</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-3 text-base max-sm:text-sm text-black/70">
              <SoMail className="w-6 h-6 text-white" />
              <p className="text-white text-base">info@smsid.co.uk</p>
            </div>
          </div>
            <div className="flex-row max-sm:justify-center items-center space-x-5 hidden">
              <div className="bg-white rounded-lg w-9 p-2">
                <SoFacebook className="text-primary w-full h-full" />
              </div>
              <div className="bg-white rounded-lg w-9 p-2">
                <SoTwitter className="text-primary w-full h-full" />
              </div>
              <div className="bg-white rounded-lg w-9 p-2">
                <SoInstagram className="text-primary w-full h-full" />
              </div>
              <div className="bg-white rounded-lg w-9 p-2">
                <SoLinkedIn className="text-primary w-full h-full" />
              </div>
              <div className="bg-white rounded-lg w-9 p-2">
                <SoYouTube className="text-primary w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-white mt-6 mb-5" />
      <p className="text-center text-sm text-white">
        Copyright © 2024 Bringovia | All Rights Reserved | <span className="underline cursor-pointer">Terms and Conditions</span> | <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </footer>
  );
};

export default Footer;
