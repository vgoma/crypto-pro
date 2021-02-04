import 'cadesplugin';
import { rawCertificates, parsedCertificates } from '../__mocks__/certificates';
import { createXMLSignature } from './createXMLSignature';
import { _getCadesCert } from '../helpers/_getCadesCert';

const [rawCertificateMock] = rawCertificates;
const [parsedCertificateMock] = parsedCertificates;

jest.mock('../helpers/_getCadesCert', () => ({ _getCadesCert: jest.fn(() => rawCertificateMock) }));

beforeEach(() => {
  (_getCadesCert as jest.Mock).mockClear();
});

const executionSteps = [Symbol('step 0'), Symbol('step 1'), Symbol('step 2')];

const executionFlow = {
  [executionSteps[0]]: {
    propset_Certificate: jest.fn(),
    propset_CheckCertificate: jest.fn(),
  },
  [executionSteps[1]]: {
    propset_Content: jest.fn(),
    propset_SignatureType: jest.fn(),
    propset_SignatureMethod: jest.fn(),
    propset_DigestMethod: jest.fn(),
    Sign: jest.fn(() => executionSteps[2]),
  },
  [executionSteps[2]]: 'signature',
};

window.cadesplugin.__defineExecutionFlow(executionFlow);
window.cadesplugin.CreateObjectAsync.mockImplementation((object) => {
  switch (object) {
    case 'CAdESCOM.CPSigner':
      return executionSteps[0];
    case 'CAdESCOM.SignedXML':
      return executionSteps[1];
  }
});

describe('createXMLSignature', () => {
  test('uses specified certificate', async () => {
    await createXMLSignature(parsedCertificateMock.thumbprint, 'message');

    expect(_getCadesCert).toHaveBeenCalledWith(parsedCertificateMock.thumbprint);
  });

  test('returns signature', async () => {
    const signature = await createXMLSignature(
      parsedCertificateMock.thumbprint,
      `
      <?xml version="1.0" encoding="UTF-8"?>
      <!--
       Original XML doc file for sign example.
      -->
      <Envelope xmlns="urn:envelope">
          <Data>
              Hello, World!
          </Data>
          <Node xml:id="nodeID">
              Hello, Node!
          </Node>
      
      </Envelope>
    `,
    );

    expect(signature).toEqual('signature');
  });
});
