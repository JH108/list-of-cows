export interface CowI {
  cowName: string;
  cowDescription: string;
}

const latency = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const initialDataJson = JSON.stringify({});

const data = {};

const init = () => {
  const dataFromLocal = localStorage.getItem("cowData") || initialDataJson;
  const parsedData = JSON.parse(dataFromLocal);
  Object.entries(parsedData).forEach(([key, value]) => {
    data[key] = value;
  });
};

init();

export const getCow = async (id: string) => {
  await latency(500);
  const cow = data[id] || {};

  return cow;
};

export const getCows = async (ids?: string[]) => {
  await latency(500);

  if (Array.isArray(ids)) {
    const cows = ids.map(id => data[id] || {});
    return cows;
  }

  const allCows = Object.values(data);

  return allCows;
};

export const addCow = async ({ id, cow }: { id: string; cow: CowI }) => {
  await latency(1000);
  data[id] = { id, ...cow };
  localStorage.setItem("cowData", JSON.stringify(data));

  return data[id];
};
