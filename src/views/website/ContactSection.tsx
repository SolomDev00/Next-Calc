import Input from '../../components/schema/Input';
import Textarea from '../../components/schema/Textarea';
import Button from '../../components/schema/Button';
import toast from 'react-hot-toast';
import { FormEvent, useState } from 'react';
import axiosInstance from '../../config/axios.config';
import { tokenSelector } from '../../app/functions/token';
import { useSelector } from 'react-redux';
import { SoSend } from 'solom-icon';

const ContactSection = () => {
  const { access_token } = useSelector(tokenSelector);

  const [msgData, setMsgData] = useState({
    msgName: '',
    msgEmail: '',
    msgPhone: '',
    msgCompany: '',
    msgMessage: '',
  });

  const handleSendMsg = async (e: FormEvent) => {
    e.preventDefault();

    if (!msgData.msgName || !msgData.msgEmail || !msgData.msgPhone || !msgData.msgMessage || !msgData.msgCompany) {
      toast.error('Please fill all fields');
      return;
    }

    const data = {
      name: msgData.msgName,
      email: msgData.msgEmail,
      number: msgData.msgPhone,
      message: msgData.msgMessage,
      company_name: msgData.msgCompany,
      status: 1
    };

    try {
      const response = await axiosInstance.post('contacts', data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status === 200) {
        toast.success('The Message was sent successfully!');
        console.log(response);
        setMsgData({
          msgName: '',
          msgEmail: '',
          msgPhone: '',
          msgCompany: '',
          msgMessage: '',
        });
      } else {
        toast.error('Failed to send the message!');
      }
    } catch (error) {
      toast.error('An error occurred while sending the Request');
    }
  };

  return (
    <section id="contact">
      <div className="mt-20 h-auto pb-5 hidden">
        <div className="flex flex-col justify-between items-center gap-10 container max-sm:flex-col max-sm:space-x-0">
          <div className="flex flex-col justify-between items-center space-y-3">
            {/* <img className='w-52' src={ContactTitleImg} alt='Title Contact Us' loading='lazy' /> */}
            <p className="text-[#525252] text-center text-base font-medium max-sm:text-sm max-sm:text-center">
              We will answer you soon.
            </p>
          </div>
          <div className='flex flex-row items-center justify-between max-sm:flex-col-reverse'>
            <form className='flex flex-col items-start justify-between space-y-2' onSubmit={handleSendMsg}>
              <div className='flex flex-row items-center space-x-3'>
                <div className="flex flex-col gap-1">
                  <label className='text-sm text-primary font-medium' htmlFor="fullname">Full Name</label>
                  <Input id='fullname' type='name' aria-describedby="username-help" value={msgData.msgName} onChange={(e) => setMsgData({ ...msgData, msgName: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className='text-sm text-primary font-medium' htmlFor="phone">Phone No.</label>
                  <Input id='phone' type='number' aria-describedby="phone-help" value={msgData.msgPhone} onChange={(e) => setMsgData({ ...msgData, msgPhone: e.target.value })} />
                </div>
              </div>
              <div className='flex flex-row items-center space-x-3'>
                <div className="flex flex-col gap-1">
                  <label className='text-sm text-primary font-medium' htmlFor="email">Email Address</label>
                  <Input id='email' type='email' aria-describedby="email-help" value={msgData.msgEmail} onChange={(e) => setMsgData({ ...msgData, msgEmail: e.target.value })} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className='text-sm text-primary font-medium' htmlFor="company">Name of Company</label>
                  <Input id='company' type='name' aria-describedby="companyname-help" value={msgData.msgCompany} onChange={(e) => setMsgData({ ...msgData, msgCompany: e.target.value })} />
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label className='text-sm text-primary font-medium' htmlFor="msg">Message</label>
                <Textarea id='msg' aria-describedby="message-help" value={msgData.msgMessage} onChange={(e) => setMsgData({ ...msgData, msgMessage: e.target.value })} />
              </div>
              <Button fullWidth type="submit" className="w-full flex items-center gap-2">
                <SoSend className="h-5 w-5" />
                Submit
              </Button>
            </form>
            <div className='flex-shrink-0 w-1/2 max-sm:mt-10 max-sm:w-10/12'>
              {/* <img className="image-float duration-300" src={ContactImg} alt="Contact Us" loading='lazy' /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
