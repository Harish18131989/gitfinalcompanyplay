import loginData from '../testdata/Logindata.json' with { type: 'json' };

export function getTestData(tcId) {
  const data = loginData.find(item => item.tcId === tcId);

  if (!data) {
    throw new Error(`Test data not found for ${tcId}`);
  }

  return data;
}