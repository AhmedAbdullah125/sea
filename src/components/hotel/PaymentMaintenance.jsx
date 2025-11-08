import React from 'react';
import { Link } from 'react-router-dom';
import payment from '../../../public/app/payment.png';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const PaymentMaintenance = () => {
    return (
        <section>
            <Header />
            <div style={styles.container}>
                <img
                    src={payment} // Make sure this image exists in your public folder
                    alt="Payment Maintenance"
                    style={styles.image}
                />
                <h2 style={styles.heading}>عذرًا، طريقة الدفع غير متاحة حاليًا</h2>
                <p style={styles.message}>
                    نحن نقوم حالياً بإجراء بعض أعمال الصيانة على بوابة الدفع الخاصة بنا.
                    <br />
                    يرجى المحاولة مرة أخرى لاحقاً أو استخدام طريقة أخرى للحجز مثل الواتساب.
                </p>
                <Link to="/" style={styles.button}>
                    العودة إلى الصفحة الرئيسية
                </Link>
            </div>
            <Footer />
        </section>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: "20px",
        textAlign: 'center',
        padding: '60px 20px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    image: {
        width: '350px',
        marginBottom: '30px',
    },
    heading: {
        fontSize: '24px',
        color: '#A71755',
        marginBottom: '16px',
    },
    message: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '30px',
        lineHeight: '1.8',
    },
    button: {
        backgroundColor: '#A71755',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '30px',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default PaymentMaintenance;
