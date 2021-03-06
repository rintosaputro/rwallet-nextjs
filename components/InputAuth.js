/* eslint-disable react/prop-types */
import { AiOutlineEye } from 'react-icons/ai';
import styles from './styles/InputAuth.module.css';

function InputAuth({
  IconElement, cls, id, placehld, type,
}) {
  return (
    <div className={`${styles.contain} position-relative mt-5`}>
      {IconElement}
      {type === 'password' && <AiOutlineEye className={`${styles.eye} position-absolute`} />}
      <div className="">
        <input className={`${styles.inputsection} w-100 ${cls}`} id={id} type={type} placeholder={`Enter your ${placehld}`} />
      </div>
    </div>
  );
}

export default InputAuth;
