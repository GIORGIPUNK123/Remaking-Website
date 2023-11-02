// import * as Yup from 'yup';
// export const registerSchema = Yup.object().shape({
//   name: Yup.string()
//     .required()
//     .min(3, 'Name has to contain more than 3 letters')
//     .max(15, 'Password has to contain less than 15 letters'),
//   surname: Yup.string()
//     .required()
//     .min(6, 'Surname has to contain more than 3 letters')
//     .max(15, 'Password has to contain less than 15 letters'),
//   email: Yup.string()
//     .required()
//     .email()
//     .min(2, 'Email has to contain more than 2 letters')
//     .test('test-name', 'Email already exists', (value) => {
//       fetch('https://geolab-project-backend.onrender.com/checkuser', {
//         method: 'POST',
//         body: JSON.stringify({ email: value }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((res) => res.json())
//         .then((values) => {
//           if (values.emailExists === true) {
//             setEmailExists(false);
//           } else {
//             setEmailExists(true);
//           }
//           console.log('fetch values: ', values);
//         })
//         .catch((err) => {
//           console.log('Error: ', JSON.stringify(err));
//         });
//       return emailExists;
//     })
//     .max(50, 'Email has to contain less than 50 letters'),

//   password: Yup.string()
//     .required()
//     .min(6, 'Password has to contain more than 6 letters')
//     .max(15, 'Password has to contain less than 15 letters'),

//   repeatPassword: Yup.string()
//     .required()
//     .oneOf([Yup.ref('password')], 'Passwords do not match'),
// });
