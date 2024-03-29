/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import { Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PinInput from 'react-pin-input';
import { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlineDownload } from 'react-icons/ai';
import Layout from '../../components/Layout';
import SideBar from '../../components/SideBar';
import styles from '../../styles/Transfer.module.css';
import ReceiverList from '../../components/ReceiverList';
import ButtonComp from '../../components/ButtonComp';
import { transfer } from '../../redux/actions/transaction';

function Transfer() {
  const route = useRouter();
  const dispatch = useDispatch();
  const [code, setCode] = useState();
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);

  let pin;
  const { inputTransfer, login, transfer: transferState } = useSelector((state) => state);

  useEffect(() => {
    setSuccess(false);
    setConfirm(false);
    dispatch({ type: 'TRANSFER_CLEAR' });
  }, []);

  useEffect(() => {
    if (transferState.isSuccess) {
      setSuccess(true);
      setConfirm(true);
    } else {
      setSuccess(false);
      setConfirm(false);
    }
  }, [transferState.isSuccess]);

  const handleCode = (e) => {
    e.preventDefault();
    setConfirm(true);
    dispatch(transfer(login.token, Number(inputTransfer.results.amount), Number(inputTransfer.results.idUser), Number(code), inputTransfer.results.notes));
    window.scrollTo(0, 0);
  };

  const listDetail = (title, desc) => (
    <div className={`${styles.cardList} card bg-light p-3 mt-3`}>
      <div>{title}</div>
      <h5 className="mt-3 fw-bold">{desc}</h5>
    </div>
  );

  const {
    picture, fullName, phone, amount, balanceLeft, date, notes,
  } = inputTransfer.results;

  return (
    <Layout>
      <main className={`${styles.contain} container`}>
        <Row>
          <aside className="col-lg-4 d-none d-lg-block">
            <SideBar />
          </aside>
          <section className="col-12 col-lg-8">
            <div className="card bg-light p-4">
              {confirm
                ? (!transferState.isError ? (
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <div className={`bg-primary d-flex align-items-center justify-content-center my-4 ${styles.pill}`}><AiOutlineCheck className="fs-1" /></div>
                    <h4>Transfer Success</h4>
                  </div>
                )
                  : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <div className={`bg-danger text-white d-flex align-items-center justify-content-center my-4 ${styles.pill}`}><AiOutlineCheck className="fs-1" /></div>
                      <h4>Transfer Failed</h4>
                      {transferState.errMessage === 'Wrong PIN!'
                        ? <p>{transferState.errMessage}</p>
                        : <p className="px-5 text-center mt-3">We can’t transfer your money at the moment, we recommend you to check your internet connection and try again.</p>}
                    </div>
                  )
                )
                : (
                  <div>
                    <h4>Transfer To</h4>
                    <ReceiverList image={picture || '/img/defaultPict.png'} name={fullName} phone={phone || 'Phone not available'} />
                  </div>
                )}
              <h4 className="my-5">Details</h4>
              {listDetail('Amount', `Rp${Number(amount).toLocaleString('id-ID')}`)}
              {listDetail('Balance Left', `Rp${Number(balanceLeft).toLocaleString('id-ID')}`)}
              {listDetail('Date & Time', date)}
              {listDetail('Notes', notes)}
              {confirm
              && (
              <div className="mt-5">
                <h4>Transfer To</h4>
                <ReceiverList image={picture || '/img/defaultPict.png'} name={fullName} phone={phone || 'Phone not available'} />
              </div>
              )}
              <div className="mt-5 text-end">
                {success && (
                <ButtonComp variant="secondary me-4">
                  <AiOutlineDownload className="" />
                  {' '}
                  Download PDF
                </ButtonComp>
                )}
                {confirm && success
                  ? <ButtonComp event={(e) => route.push('/home')}>Back to Home</ButtonComp>
                  : (
                    <ButtonComp type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                      {confirm && !success ? 'Try Again' : 'Continue'}
                    </ButtonComp>
                  )}
              </div>
              <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className={`modal-content bg-primary text-dark ${styles.modal}`}>
                    <div className={`modal-header ${styles.borderNone}`}>
                      <h5 className="modal-title" id="exampleModalLabel">Enter PIN to Transfer</h5>
                      {' '}
                      <br />
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <p className="px-3">Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                    <div className="modal-body px-3">
                      <PinInput
                        length={6}
                        focus
                        ref={(n) => (pin = n)}
                        onChange={(value, index) => { setCode(value); }}
                        type="numeric"
                        inputMode="number"
                        style={{ padding: '10px' }}
                        inputStyle={{ borderColor: 'black', color: 'black' }}
                        inputFocusStyle={{ borderColor: 'teal' }}
                        autoSelect
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                      />
                    </div>
                    <div className={`modal-footer ${styles.borderNone}`}>
                      <button type="button" className="btn btn-light fw-bold py-3 px-4" onClick={handleCode} data-bs-dismiss="modal">Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Row>
      </main>
    </Layout>
  );
}

export default Transfer;
