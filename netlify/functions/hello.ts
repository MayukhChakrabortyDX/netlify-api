import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import * as admin from 'firebase-admin'
import { ServiceAccount } from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore'

var serviceAccount: ServiceAccount = {
  "type": "service_account",
  "project_id": "admin-netlify-test",
  "private_key_id": "3a75623fb2aa30eddbcf26f05a619367148cead5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCiAF5WacAoJHdS\nXkEokW5BpKDSVZmU5LsuyUZYn+aXbhWJK5rza9k+meY8zPRRmwQXQ/IzwurgsTNU\nyx1Xt9WRn2hdXvInskknm61CVWYIyZZ2msrAz6vDuL4oFKE+suq+GeZ/X2SlODus\nXZHf+UCqZZNAqnVjTC+ZcroOA8e5li20vcK53zloKfpMYP8EDn49U0tedUmysAwh\nIa/TRt6dCvGVIGI/Ep75s/fFQbWFMttNezZJySbx8h9RSj1nMWKGrnLJdVTBzef1\nJOxUi3V/nzgvW54u73MJAdm7UkcRq5dsP5F+KbfzR4U1x2qGi71X5ndTaKp9bKvA\nDXkRLPZtAgMBAAECggEAEKj4iqr38bjkU4JxcX5ZSCNpzY+zimombNaSpzEUifyu\ndsuW9RMhhYxWruiF9LF8L3dTnGqedIqMpJr50shLTJ1H4phNz3LIjqv2GrUFGADB\nOkPLd54zxB5G4gDTH0tPlEq+F1nEVDBvBJgf1RiBQ7TL+rG8/j/6wi1YAHJ3kvh6\nhQ2UT9WKBPeE1tKM8pGiTkFouhxGzkI5AaAAy7osbxmwlx9rUtIBOySkrAYPnh8W\nvO2gif5TtixYpfymAr1+0LnOgzPtWtESfkr2nCAOogHo7LOHDzs5i4DlRKXotfSd\n5oElpSkKRcyo6BRWXiadhKHU4Mi41PPzaee6GEIxAQKBgQDdXrr+x8pkZObtY62N\nKMzJR0Qzr26MHt18AMob4SRFaDEK7FqPs6nFW3qLL8RO8u+5BWHhdNHDb/h2uyka\nZSqWxuC36p0NHA/irDuLfjOJRMpJNi3BrTimAVLxgoLFEtMuJJWZ0MnQLQB1ip8a\n+WBvPyCTD9jyk2yKMPFn5fWtAQKBgQC7WBYuH2HqdribiLEsqjAxE6i1V+kp+zZ6\ncYgdTgc0xuJJw/9D41axJBLllXi0Tq57HXoa+ALmQbu2zHQmZvVP1C1dFq7bR8rn\ngFTT/Z8kSBr8wda+3DL/Lb68Z/q/fJFxwVLYrjGYrgSjmJy5Ft6viza9lSzER9QJ\nhVeurYlNbQKBgB4TaMSE0HKjYtyN1l5/VJNkI1gCVbqj1uOqF8uB4zOq3D7nrcYo\nWsB9lUCj1MAFMZypporDHFy5McCv3P3BEPA7RPy3226UiXP6gnyJQOc9eV5JBh5y\nMmgbdfFqEepEjHyQa+LiAwlNk+pkUwmPKBL1OK/CT29lqDF+RM4g6CgBAoGBAJ/Q\n1iMEbIAaRQORiSsEB9Zl4d7JHsPMZL3xSd9N6AHSw8mPpJviPNsiXehyKSUPlfK6\nw6Zr+fU5EAwxv8fevtgZtZUau5GeXe484KBzVCYcSMFkDnCE4hAjkvmgbhyaBG0Z\nMTZc6zxG/vgcQV33r4Hq7Yiu0CCk8bIpiRIfQejFAoGBANibDSstnyVd4BOqk3jE\n5Up/U5Z/JonDDrtf2kVJpK2ZA8UyafduT+z4i0yEmzoPIOQ+8MYjlNrKuOym92Ri\nxx+Gsv5D20bIpsMOd+fJz1B52UuYvnfS3IqfFZXSSSCq1u8xQOOfCBFDpziN6H3K\nBZ4E+JdquLkUAeUy3Dr0239Z\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-x7vv6@admin-netlify-test.iam.gserviceaccount.com",
  "client_id": "106878360468872913475",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x7vv6%40admin-netlify-test.iam.gserviceaccount.com"
}

var app: admin.app.App;

if ( admin.apps.length == 0 ) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

//@ts-ignore
const firestore = getFirestore(app)

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  
  //data
  let orders = firestore.collection("orders")
  let lastOrder = orders.limit(1).orderBy('index', "desc")

  let doc = await (await lastOrder.get()).docs[0].data()

  return {
    statusCode: 200,
    body: `${JSON.stringify(doc)}`,
  };
};

export { handler };