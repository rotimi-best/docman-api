const { addOrder, deleteOrder } = require('../db/cruds/Order')
const { addRepair, deleteRepair } = require('../db/cruds/Repair')
const { addExpensis, deleteExpensis } = require('../db/cruds/Expensis')

module.exports = async () => {
  await deleteOrder({ _id: { $exists: true }});
  await deleteRepair({ _id: { $exists: true }});
  await deleteExpensis({ _id: { $exists: true }});

  const orders = [
    {
      date: new Date('05.12.2017'),
      startPoint: 'Одесса',
      destination: 'Киев',
      deliveryCost: '920',
      cargo: '50',
      weight: '30',
      distance: '284',
      price: '20000',
      fuelConsumption: '2439.25'
    },
    {
      date: new Date('05.13.2017'),
      startPoint: 'Харьков',
      destination: 'Львов',
      deliveryCost: '920',
      cargo: '50',
      weight: '30',
      distance: '296',
      price: '1200',
      fuelConsumption: '2601.59'
    },
    {
      date: new Date('05.14.2017'),
      startPoint: 'Ужгород',
      destination: 'Полтава',
      deliveryCost: '920',
      cargo: '50',
      weight: '30',
      distance: '393',
      price: '4500',
      fuelConsumption: '2891.49'
    },
    {
      date: new Date('05.15.2017'),
      startPoint: 'Херсон',
      destination: 'Сумы',
      deliveryCost: '920',
      cargo: '50',
      weight: '30',
      distance: '119',
      price: '5000',
      fuelConsumption: '1044'
    },
  ];

  await addOrder(orders);

  const repairs = [
    {
      startedAt: new Date('05.12.2017'),
      endedAt: new Date('05.13.2017'),
      repairPrice: 5489.67,
      equipementPrice: 2489.67,
    },
    {
      startedAt: new Date('05.13.2017'),
      endedAt: new Date('05.14.2017'),
      repairPrice: 4601.44,
      equipementPrice: 2501.44,
    },
    {
      startedAt: new Date('05.14.2017'),
      endedAt: new Date('05.15.2017'),
      repairPrice: 3000,
      equipementPrice: 1521,
    },
  ];
  addRepair(repairs);

  const expensis = [
    {
      date: new Date('05.12.2017'),
      price: 2489.67,
      comment: 'Топливо'
    },
    {
      date: new Date('05.13.2017'),
      price: 2601.44,
      comment: 'Топливо'
    },
    {
      date: new Date('05.15.2017'),
      price: 2521,
      comment: 'Деталь'
    },
  ];

  addExpensis(expensis);
}