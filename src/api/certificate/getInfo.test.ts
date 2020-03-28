import 'cadesplugin';
import { ISSUER_TAGS_TRANSLATIONS } from '../../constants';
import { getInfo } from './getInfo';
import { getCadesProp } from './getCadesProp';
import { _parseCertInfo } from '../../helpers/_parseCertInfo';

const entitiesPathMock = 'path to entities';
const entitiesMock = 'info about the entities';
const certificateInfoMock = [
  {
    description: 'description',
    title: 'title',
    isTranslated: true,
  },
];

jest.mock('./getCadesProp', () => ({ getCadesProp: jest.fn(() => entitiesMock) }));
jest.mock('../../helpers/_parseCertInfo', () => ({ _parseCertInfo: jest.fn(() => certificateInfoMock) }));

beforeEach(() => {
  (getCadesProp as jest.Mock).mockClear();
  (_parseCertInfo as jest.Mock).mockClear();
});

describe('getInfo', () => {
  test('calls external APIs to get information about the certificate', async () => {
    const certificateInfo = await getInfo(ISSUER_TAGS_TRANSLATIONS, entitiesPathMock);

    expect(getCadesProp).toHaveBeenCalledTimes(1);
    expect(getCadesProp).toHaveBeenCalledWith(entitiesPathMock);
    expect(_parseCertInfo).toHaveBeenCalledTimes(1);
    expect(_parseCertInfo).toHaveBeenCalledWith(ISSUER_TAGS_TRANSLATIONS, entitiesMock);
    expect(certificateInfo).toStrictEqual(certificateInfoMock);
  });
});
