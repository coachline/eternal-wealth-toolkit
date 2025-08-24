import React, { useState, useEffect } from 'react';
import {
  DollarSign, BarChart2, Briefcase, TrendingUp, Handshake, HeartHandshake, Home, Shield, Lightbulb, CheckCircle, Target, ArrowRightCircle
} from 'lucide-react'; // Using lucide-react for icons

// Utility function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Helper to generate a unique ID (for list items)
const generateId = () => Math.random().toString(36).substring(2, 9);

// --- Component: Header ---
const Header = ({ setActiveTab }) => (
  <header className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 shadow-lg rounded-t-xl">
    <div className="container mx-auto flex flex-wrap justify-between items-center">
      <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Eternal Wealth Toolkit</h1>
      <nav className="flex flex-wrap gap-2 md:gap-4">
        <TabButton label="Dashboard" onClick={() => setActiveTab('dashboard')} icon={<Home size={18} />} />
        <TabButton label="Face Numbers" onClick={() => setActiveTab('step1')} icon={<BarChart2 size={18} />} />
        <TabButton label="Emergency Fund" onClick={() => setActiveTab('step2')} icon={<Shield size={18} />} />
        <TabButton label="Automate" onClick={() => setActiveTab('step3')} icon={<ArrowRightCircle size={18} />} />
        <TabButton label="Cut Noise" onClick={() => setActiveTab('step4')} icon={<Lightbulb size={18} />} />
        <TabButton label="Pray & Act" onClick={() => setActiveTab('step5')} icon={<Handshake size={18} />} />
      </nav>
    </div>
  </header>
);

// --- Component: TabButton ---
const TabButton = ({ label, onClick, icon }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200 shadow-md text-sm font-medium"
  >
    {icon} {label}
  </button>
);

// --- Component: ProgressBar ---
const ProgressBar = ({ current, target, label }) => {
  const progress = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const isComplete = progress >= 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-medium text-gray-700">
        <span>{label}</span>
        <span>{formatCurrency(current)} / {formatCurrency(target)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3.5 mt-1">
        <div
          className={`h-3.5 rounded-full transition-all duration-500 ease-out ${
            isComplete ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className={`text-xs mt-1 ${isComplete ? 'text-green-600' : 'text-gray-500'}`}>
        {isComplete ? 'Goal Achieved!' : `${Math.round(progress)}% Complete`}
      </p>
    </div>
  );
};


// --- Sheet: Dashboard ---
const Dashboard = ({ incomeData, expenseData, savingsData }) => {
  const totalIncome = incomeData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
  const netSavings = totalIncome - totalExpenses;
  const currentSavings = savingsData.emergencyFund;
  const twentyKGoal = 20000;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Your Wealth Journey Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard title="Total Income" value={formatCurrency(totalIncome)} color="green" icon={<DollarSign size={24} />} />
        <MetricCard title="Total Expenses" value={formatCurrency(totalExpenses)} color="red" icon={<BarChart2 size={24} />} />
        <MetricCard title="Net Savings" value={formatCurrency(netSavings)} color="blue" icon={<TrendingUp size={24} />} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your First $20K Milestone</h3>
        <ProgressBar current={currentSavings} target={twentyKGoal} label="Progress to $20,000" />
        <p className="text-gray-600 mt-4 text-center">Keep building momentum! Every step brings you closer to financial freedom.</p>
        </div>
    </div>
  );
};

// --- Component: MetricCard ---
const MetricCard = ({ title, value, color, icon }) => (
  <div className={`bg-white p-6 rounded-lg shadow-lg border-b-4 border-${color}-500 flex items-center justify-between`}>
    <div>
      <h3 className="text-lg font-medium text-gray-600">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
    </div>
    <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
      {icon}
    </div>
  </div>
);


// --- Sheet: Step 1 - Face Your Numbers ---
const Step1 = ({ incomeData, setIncomeData, expenseData, setExpenseData }) => {
  const [newIncomeSource, setNewIncomeSource] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newExpenseDescription, setNewExpenseDescription] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  const handleAddIncome = () => {
    if (newIncomeSource && newIncomeAmount) {
      setIncomeData([...incomeData, { id: generateId(), source: newIncomeSource, amount: parseFloat(newIncomeAmount) }]);
      setNewIncomeSource('');
      setNewIncomeAmount('');
    }
  };

  const handleAddExpense = () => {
    if (newExpenseCategory && newExpenseAmount) {
      setExpenseData([...expenseData, { id: generateId(), category: newExpenseCategory, description: newExpenseDescription, amount: parseFloat(newExpenseAmount) }]);
      setNewExpenseCategory('');
      setNewExpenseDescription('');
      setNewExpenseAmount('');
    }
  };

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);

  // For expense chart: aggregate *all* expenses by category
  const allExpenseCategories = expenseData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const sortedAllCategories = Object.entries(allExpenseCategories).sort(([, a], [, b]) => b - a);
  const maxAllExpense = Math.max(...Object.values(allExpenseCategories), 0);

  // For money leaks: aggregate expenses < $200 by category
  const moneyLeakCategories = expenseData
    .filter(item => item.amount < 200) // Filter for expenses less than $200
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

  const sortedMoneyLeakCategories = Object.entries(moneyLeakCategories).sort(([, a], [, b]) => b - a);
  const maxMoneyLeakExpense = Math.max(...Object.values(moneyLeakCategories), 0);


  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">1. Face Your Numbers</h2>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        "Be diligent to know the state of your flocks, and attend to your herds." <br/> **Proverbs 27:23**
        Clarity is the first step to freedom.
        Track your income and spending to spot money leaks and create realistic savings targets.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Income Section */}
        <div className="bg-green-50 p-6 rounded-lg shadow-md border-t-4 border-green-600">
          <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center"><DollarSign className="mr-2" /> Income</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Source (e.g., Paycheck)"
              value={newIncomeSource}
              onChange={(e) => setNewIncomeSource(e.target.value)}
              className="p-3 border border-gray-300 rounded-md flex-grow focus:ring-green-500 focus:border-green-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newIncomeAmount}
              onChange={(e) => setNewIncomeAmount(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full md:w-auto focus:ring-green-500 focus:border-green-500"
            />
            <button
              onClick={handleAddIncome}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all duration-200 shadow-md"
            >
              Add Income
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto mb-4 border border-green-200 rounded-md">
            {incomeData.length === 0 ? (
              <p className="text-gray-500 text-center p-4">No income recorded yet.</p>
            ) : (
              <table className="min-w-full bg-white text-sm">
                <thead className="sticky top-0 bg-green-100">
                  <tr>
                    <th className="py-2 px-4 text-left text-green-800">Source</th>
                    <th className="py-2 px-4 text-left text-green-800">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeData.map((item) => (
                    <tr key={item.id} className="border-b border-green-100 last:border-0">
                      <td className="py-2 px-4">{item.source}</td>
                      <td className="py-2 px-4">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <p className="text-xl font-bold text-green-800 text-right mt-4">Total Income: {formatCurrency(totalIncome)}</p>
        </div>

        {/* Expenses Section */}
        <div className="bg-red-50 p-6 rounded-lg shadow-md border-t-4 border-red-600">
          <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center"><BarChart2 className="mr-2" /> Expenses</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Category (e.g., Groceries)"
              value={newExpenseCategory}
              onChange={(e) => setNewExpenseCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded-md flex-grow focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="text"
              placeholder="Description (Optional)"
              value={newExpenseDescription}
              onChange={(e) => setNewExpenseDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-md flex-grow focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full md:w-32 focus:ring-red-500 focus:border-red-500" /* Adjusted width */
            />
            <button
              onClick={handleAddExpense}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-all duration-200 shadow-md"
            >
              Add Expense
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto mb-4 border border-red-200 rounded-md">
            {expenseData.length === 0 ? (
              <p className="text-gray-500 text-center p-4">No expenses recorded yet.</p>
            ) : (
              <table className="min-w-full bg-white text-sm">
                <thead className="sticky top-0 bg-red-100">
                  <tr>
                    <th className="py-2 px-4 text-left text-red-800">Category</th>
                    <th className="py-2 px-4 text-left text-red-800">Description</th>
                    <th className="py-2 px-4 text-left text-red-800">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseData.map((item) => (
                    <tr key={item.id} className="border-b border-red-100 last:border-0">
                      <td className="py-2 px-4">{item.category}</td>
                      <td className="py-2 px-4">{item.description}</td>
                      <td className="py-2 px-4">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <p className="text-xl font-bold text-red-800 text-right mt-4">Total Expenses: {formatCurrency(totalExpenses)}</p>
        </div>
      </div>

      {/* Money Leaks Visualization */}
      <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-600 mt-8">
        <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center"><Target className="mr-2" /> Potential Money Leaks (Expenses Under $200)</h3>
        {sortedMoneyLeakCategories.length === 0 ? (
          <p className="text-gray-500 text-center p-4">No expenses under $200 recorded yet. Add some to spot potential leaks!</p>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {sortedMoneyLeakCategories.map(([category, amount]) => (
              <div key={category} className="flex items-center gap-2">
                <span className="w-32 text-gray-700 font-medium">{category}</span>
                <div className="flex-grow bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-purple-500 h-full rounded-full flex items-center justify-end pr-2 text-white text-xs font-semibold"
                    style={{ width: `${(amount / maxMoneyLeakExpense) * 100}%` }}
                  >
                    {formatCurrency(amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// --- Sheet: Step 2 - Build Your Emergency Fund ---
const Step2 = ({ savingsData, setSavingsData }) => {
  const [newFundAmount, setNewFundAmount] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState(savingsData.emergencyFundGoal);
  const [savingsMethods, setSavingsMethods] = useState([ // Moved from Step3
    { id: 'hysa', text: <>Open a <a href="https://shanitene.com/wealthfront" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">High-Yield Savings Account (HYSA)</a> for better interest.</>, checked: false },
    { id: 'roundUpApp', text: 'Use a "round-up" app (e.g., Acorns, Chime) for spare change savings.', checked: false },
    { id: 'rakuten', text: <>Use cash-back apps like <a href="https://shanitene.com/rakuten" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Rakuten</a> for online shopping savings.</>, checked: false },
    { id: 'couponApps', text: 'Utilize coupon apps (e.g., Ibotta, Fetch Rewards) for grocery savings.', checked: false },
    { id: 'gasApps', text: 'Find cheaper gas prices using apps (e.g., GasBuddy) to save on fuel.', checked: false },
    { id: 'directDepositSplit', text: 'Split your direct deposit to automatically send a portion to savings/investments.', checked: false },
    { id: 'payYourselfFirst', text: 'Automatically transfer a set amount to savings on payday (Pay Yourself First).', checked: false },
    { id: 'mealPlanning', text: 'Plan meals weekly to reduce food waste and impulse grocery buys.', checked: false },
    { id: 'cancelSubscriptions', text: 'Review and cancel unused subscriptions.', checked: false },
    { id: 'publicTransport', text: 'Use public transportation or carpool to save on commuting costs.', checked: false },
    { id: 'energyAudit', text: 'Conduct an energy audit at home to find ways to lower utility bills.', checked: false },
    { id: 'negotiateBills', text: 'Negotiate lower rates for internet, cable, or insurance bills.', checked: false },
    { id: 'diyInstead', text: 'Do small repairs or projects yourself instead of hiring help.', checked: false },
    { id: 'coffeeAtHome', text: 'Make coffee at home instead of buying it daily.', checked: false },
    { id: 'packedLunches', text: 'Pack lunches for work/school to avoid eating out.', checked: false },
    { id: 'bulkBuying', text: 'Buy non-perishable items in bulk when on sale.', checked: false },
    { id: 'libraryUse', text: 'Borrow books, movies, and games from the library instead of buying.', checked: false },
    { id: 'sellUnusedItems', text: 'Sell unused clothing, electronics, or household items.', checked: false },
    { id: 'priceCompare', text: 'Always compare prices online before making a significant purchase.', checked: false },
    { id: 'repurposeItems', text: 'Find new uses for old items instead of buying new ones.', checked: false },
    { id: 'waterBottle', text: 'Carry a reusable water bottle instead of buying bottled water.', checked: false },
    { id: 'loyaltyPrograms', text: 'Join loyalty programs for stores you frequent.', checked: false },
    { id: 'delayPurchases', text: 'Implement a 30-day rule for non-essential purchases.', checked: false },
    { id: 'digitalCoupons', text: 'Use digital coupons and store loyalty apps for discounts.', checked: false },
    { id: 'avoidATMFees', text: 'Avoid ATM fees by using your bank\'s network or getting cash back.', checked: false },
    { id: 'lowerPhoneBill', text: 'Switch to a cheaper phone plan or negotiate current rates.', checked: false },
    { id: 'homeCooking', text: 'Cook more at home instead of relying on takeout or restaurants.', checked: false },
    { id: 'smartThermostat', text: 'Install a smart thermostat to optimize energy usage.', checked: false },
    { id: 'gardening', text: 'Grow some of your own fruits and vegetables.', checked: false },
    { id: 'usedItems', text: 'Buy quality used items (clothes, furniture) instead of new.', checked: false }
  ]);

  const handleUpdateFund = () => {
    const amount = parseFloat(newFundAmount);
    if (!isNaN(amount)) {
      setSavingsData(prev => ({ ...prev, emergencyFund: amount }));
      setNewFundAmount('');
    }
  };

  const handleUpdateGoal = () => {
    const goal = parseFloat(newGoalAmount);
    if (!isNaN(goal) && goal > 0) {
      setSavingsData(prev => ({ ...prev, emergencyFundGoal: goal }));
    }
  };

  const toggleSavingsMethod = (id) => { // Moved from Step3
    setSavingsMethods(prevMethods =>
      prevMethods.map(method =>
        method.id === id ? { ...method, checked: !method.checked } : method
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">2. Build Your Emergency Fund</h2>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        "The wise store up choice food and olive oil, but fools gulp theirs down." <br/> **Proverbs 21:20**
        Your emergency fund is your ark,
        preparing you for the unexpected and dramatically lowering stress.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg shadow-md border-t-4 border-blue-600 mb-8">
        <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center"><Shield className="mr-2" /> Emergency Fund Progress</h3>
        <ProgressBar
          current={savingsData.emergencyFund}
          target={savingsData.emergencyFundGoal}
          label="Emergency Fund Balance"
        />
        <div className="mt-6 p-4 bg-blue-100 rounded-md text-blue-800 flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ship"><path d="M2 20h20"></path><path d="M6 19c0-1.7.3-3.4 1-5 .8-1.9 2-3.6 3.5-4.9c1.5-1.3 3.3-2 5.2-2.1 1.3-.1 2.6.2 3.8.7L22 7c0 3.1.9 6.2 2 9.2c.5 1.7 1 3.4 1 5h-21"></path><path d="M18 20a2 2 0 0 0 2-2V7l-4-3-6 5-4-3-2 3v7c0 1.7.3 3.4 1 5h15Z"></path></svg> {/* Simple Ark-like SVG */}
          <p className="font-semibold">Think of this as your ark moment, like Noah preparing for the flood. Your emergency fund is your ark.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-b-4 border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Your Fund</h3>
          <div className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Current Fund Amount"
              value={newFundAmount}
              onChange={(e) => setNewFundAmount(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleUpdateFund}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-200 shadow-md"
            >
              Update Fund Balance
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-b-4 border-gray-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Set Emergency Fund Goal</h3>
          <div className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Goal Amount (e.g., 1000 or 3 months expenses)"
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(e.target.value)}
              className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleUpdateGoal}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-all duration-200 shadow-md"
            >
              Set Goal
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Current Goal: {formatCurrency(savingsData.emergencyFundGoal)}</p>
        </div>
      </div>

      <div className="mt-10 p-6 bg-yellow-50 rounded-lg shadow-md border-t-4 border-yellow-600 mb-8">
        <h3 className="text-2xl font-bold text-yellow-800 mb-4">Practical Tip</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Start with a small goal: $25, $50, or $100 a paycheck until you reach $1,000.</li>
          <li>Then aim for 3 months of living expenses as your next tier.</li>
        </ul>
      </div>

      {/* 30 Ways to Save More Money - Now in Step 2 */}
      <div className="bg-emerald-50 p-6 rounded-lg shadow-md border-t-4 border-emerald-600">
        <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center"><HeartHandshake className="mr-2" /> 30 Ways to Save More Money</h3>
        <p className="text-gray-700 mb-6">Explore these diverse methods to boost your savings. Check off the ones you'll implement!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savingsMethods.map((method) => (
            <div key={method.id} className={`flex items-start gap-3 p-4 rounded-lg shadow-sm transition-all duration-200 ${
              method.checked ? 'bg-emerald-100 border-l-4 border-emerald-700' : 'bg-white border border-gray-200'
            }`}>
              <input
                type="checkbox"
                checked={method.checked}
                onChange={() => toggleSavingsMethod(method.id)}
                className="form-checkbox h-5 w-5 text-emerald-600 rounded-md mt-1 cursor-pointer"
              />
              {/* Render text as JSX to include anchor tags */}
              <p className={`text-sm flex-grow ${method.checked ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                {method.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- Sheet: Step 3 - Automate Your Obedience ---
const Step3 = ({ automationData, setAutomationData }) => {
  const [newMethod, setNewMethod] = useState('');
  const [newAmountFrequency, setNewAmountFrequency] = useState('');
  const [challengeProgress, setChallengeProgress] = useState(Array(30).fill(false)); // State for 30-day savings challenge
  // New state for automation strategies
  const [automationStrategies, setAutomationStrategies] = useState([
    { id: 'autoTransfer', text: 'Set up automatic transfers from checking to savings/investments.', checked: false },
    { id: 'directDepositSplit', text: 'Split your direct deposit to send a portion directly to savings/investments.', checked: false },
    { id: 'retirementAuto', text: 'Automate contributions to your 401k/403b (employer-sponsored retirement).', checked: false },
    { id: 'iraAuto', text: 'Set up recurring automatic contributions to an Individual Retirement Account (IRA).', checked: false },
    { id: 'hsaAuto', text: 'Automate contributions to a Health Savings Account (HSA).', checked: false },
    { id: '529Auto', text: 'Set up automatic deposits into a 529 college savings plan.', checked: false },
    { id: 'investmentAuto', text: 'Schedule recurring investments into a brokerage account.', checked: false },
    { id: 'roundUpAppAuto', text: 'Use a "round-up" app (e.g., Acorns, Chime) to automatically save spare change.', checked: false },
    { id: 'billPayAuto', text: 'Automate bill payments from a dedicated account, transferring funds into it.', checked: false },
    { id: 'rolloverBudget', text: 'Automatically roll over unspent budget money to savings at month-end.', checked: false },
    { id: 'loanExtraPaymentsAuto', text: 'Automate extra payments on a mortgage, student loan, or other debt.', checked: false },
    { id: 'vacationFundAuto', text: 'Set up recurring transfers to a dedicated vacation savings fund.', checked: false },
    { id: 'holidayFundAuto', text: 'Automate savings for holiday spending throughout the year.', checked: false },
    { id: 'emergencyFundAuto', text: 'Set up consistent automatic transfers to your emergency fund.', checked: false },
    { id: 'taxRefundSplitAuto', text: 'Directly deposit a portion of your tax refund into a savings account.', checked: false },
    { id: 'bonusSavingsAuto', text: 'Automatically save a percentage of any work bonuses or unexpected income.', checked: false },
    { id: 'recurringDonationAuto', text: 'Automate regular donations or tithes to charity/church.', checked: false },
    { id: 'kidsCollegeFundAuto', text: 'Automate contributions to children\'s college savings (e.g., UGMA/UTMA).', checked: false },
    { id: 'sinkingFundAuto', text: 'Set up automatic transfers to sinking funds for large upcoming expenses (e.g., car repair, new appliance).', checked: false },
    { id: 'dividendReinvestmentAuto', text: 'Automate dividend reinvestment in your investment accounts.', checked: false },
    { id: 'creditCardAutoPayFull', text: 'Set up credit card to auto-pay statement balance in full each month.', checked: false },
    { id: 'subscriptionReminderAuto', text: 'Use apps that track subscriptions and remind you before renewal to review/cancel.', checked: false },
    { id: 'debtSnowballAuto', text: 'Automate extra payments on the smallest debt in a debt snowball plan.', checked: false },
    { id: 'debtAvalancheAuto', text: 'Automate extra payments on the highest interest debt in a debt avalanche plan.', checked: false },
    { id: 'financialPlannerAuto', text: 'Work with a financial planner who can set up automated investment strategies.', checked: false },
    { id: 'healthInsuranceSavingsAuto', text: 'Automate contributions to a Flexible Spending Account (FSA) or similar.', checked: false },
    { id: 'rentalPropertySavingsAuto', text: 'Automatically transfer a portion of rental income to a maintenance fund.', checked: false },
    { id: 'selfEmploymentTaxAuto', text: 'Automate transfers for self-employment taxes to a separate account.', checked: false },
    { id: 'futureGoalsAuto', text: 'Set up dedicated automatic transfers for specific future goals (e.g., down payment, new car).', checked: false },
    { id: 'yearlyReviewAuto', text: 'Schedule an annual calendar reminder for a comprehensive financial automation review.', checked: false }
  ]);

  const handleAddAutomation = () => {
    if (newMethod && newAmountFrequency) {
      setAutomationData([...automationData, { id: generateId(), method: newMethod, amountFrequency: newAmountFrequency, status: 'Active' }]);
      setNewMethod('');
      setNewAmountFrequency('');
    }
  };

  const toggleStatus = (id) => {
    setAutomationData(automationData.map(item =>
      item.id === id ? { ...item, status: item.status === 'Active' ? 'Planned' : 'Active' } : item
    ));
  };

  const daysInMonth = 30; // Assuming an average month for $1 a day challenge

  const toggleChallengeDay = (index) => {
    setChallengeProgress(prev => prev.map((val, i) => i === index ? !val : val));
  };

  // Calculate cumulative total for the challenge
  const challengeTotal = challengeProgress.reduce((sum, saved, index) => {
    return saved ? sum + (index + 1) : sum;
  }, 0);

  const toggleAutomationStrategy = (id) => { // New function for automation strategies
    setAutomationStrategies(prevStrategies =>
      prevStrategies.map(strategy =>
        strategy.id === id ? { ...strategy, checked: !strategy.checked } : strategy
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">3. Automate Your Obedience</h2>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        "Whoever can be trusted with very little can also be trusted with much." <br/> **Luke 16:10**
        Consistency beats motivation.
        Set up systems to move money automatically, like God's manna in the wilderness.
      </p>

      {/* Your Automation Plan (kept as is, as it's a specific type of saving) */}
      <div className="bg-indigo-50 p-6 rounded-lg shadow-md border-t-4 border-indigo-600 mb-8">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center"><ArrowRightCircle className="mr-2" /> Your Custom Automation Plan</h3>
        <p className="text-gray-700 mb-4">Add any specific automation methods you've set up or plan to implement.</p>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Method (e.g., Direct Deposit)"
            value={newMethod}
            onChange={(e) => setNewMethod(e.target.value)}
            className="p-3 border border-gray-300 rounded-md flex-grow focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Amount/Frequency (e.g., $100/paycheck)"
            value={newAmountFrequency}
            onChange={(e) => setNewAmountFrequency(e.target.value)}
            className="p-3 border border-gray-300 rounded-md flex-grow focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleAddAutomation}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-all duration-200 shadow-md"
          >
            Add Automation
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto mb-4 border border-indigo-200 rounded-md">
          {automationData.length === 0 ? (
            <p className="text-gray-500 text-center p-4">No custom automation plans set up yet.</p>
          ) : (
            <table className="min-w-full bg-white text-sm">
              <thead className="sticky top-0 bg-indigo-100">
                <tr>
                  <th className="py-2 px-4 text-left text-indigo-800">Method</th>
                  <th className="py-2 px-4 text-left text-indigo-800">Amount/Frequency</th>
                  <th className="py-2 px-4 text-left text-indigo-800">Status</th>
                  <th className="py-2 px-4 text-left text-indigo-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {automationData.map((item) => (
                  <tr key={item.id} className="border-b border-indigo-100 last:border-0">
                    <td className="py-2 px-4">{item.method}</td>
                    <td className="py-2 px-4">{item.amountFrequency}</td>
                    <td className={`py-2 px-4 font-semibold ${item.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {item.status}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className="text-indigo-600 hover:text-indigo-800 underline text-sm"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg shadow-md border-t-4 border-purple-600 mb-8">
        <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center"><CheckCircle className="mr-2" /> Cumulative Savings Challenge</h3>
        <p className="text-gray-700 mb-4">On Day 1, save $1. On Day 2, save $2, and so on. Click each day you complete it!</p>
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2 mb-4">
          {challengeProgress.map((saved, index) => (
            <button
              key={index}
              onClick={() => toggleChallengeDay(index)}
              className={`w-10 h-10 flex flex-col items-center justify-center rounded-md text-sm font-semibold transition-all duration-200 ${
                saved ? 'bg-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="text-xs">Day {index + 1}</span>
              <span className="text-sm font-bold">{saved ? `$${index + 1}` : '$?'}</span>
            </button>
          ))}
        </div>
        <p className="text-xl font-bold text-purple-800 text-right mt-4">Total from Challenge: {formatCurrency(challengeTotal)}</p>
        <div className="mt-6 p-4 bg-purple-100 rounded-md text-purple-800 flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-rain"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg> {/* Manna-like SVG */}
          <p className="font-semibold">This is like God's manna in the wilderness: steady daily provision.</p>
        </div>
      </div>

      {/* 30 Automation Strategies to Set & Forget - New in Step 3 */}
      <div className="bg-emerald-50 p-6 rounded-lg shadow-md border-t-4 border-emerald-600">
        <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center"><HeartHandshake className="mr-2" /> 30 Automation Strategies to Set & Forget</h3>
        <p className="text-gray-700 mb-6">These are specific ways to automate your money movement. Check off the ones you'll implement!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {automationStrategies.map((strategy) => (
            <div key={strategy.id} className={`flex items-start gap-3 p-4 rounded-lg shadow-sm transition-all duration-200 ${
              strategy.checked ? 'bg-emerald-100 border-l-4 border-emerald-700' : 'bg-white border border-gray-200'
            }`}>
              <input
                type="checkbox"
                checked={strategy.checked}
                onChange={() => toggleAutomationStrategy(strategy.id)}
                className="form-checkbox h-5 w-5 text-emerald-600 rounded-md mt-1 cursor-pointer"
              />
              <p className={`text-sm flex-grow ${strategy.checked ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                {strategy.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- Sheet: Step 4 - Cut Noise, Not Life ---
const Step4 = ({ noiseLifeData, setNoiseLifeData }) => {
  const [newItem, setNewItem] = useState('');
  const [isNoise, setIsNoise] = useState(true);

  const handleAddItem = () => { // Corrected function name
    if (newItem) {
      setNoiseLifeData([...noiseLifeData, { id: generateId(), item: newItem, type: isNoise ? 'noise' : 'life' }]);
      setNewItem('');
    }
  };

  const removeItem = (id) => {
    setNoiseLifeData(noiseLifeData.filter(item => item.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">4. Cut Noise, Not Life</h2>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        "God wants you to enjoy life, just not waste it." <br/> **Ecclesiastes 3:13**
        Saving isn't punishment; it's alignment.
        Cut the noise that doesn’t add value, but keep what truly matters.
      </p>

      <div className="bg-orange-50 p-6 rounded-lg shadow-md border-t-4 border-orange-600 mb-8">
        <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center"><Lightbulb className="mr-2" /> Identify & Align Your Spending</h3>
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
          <input
            type="text"
            placeholder="Item (e.g., Unused subscription, Gym membership)"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="p-3 border border-gray-300 rounded-md flex-grow focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="itemType"
                checked={isNoise}
                onChange={() => setIsNoise(true)}
                className="form-radio text-orange-600"
              />
              <span className="ml-2 text-gray-700">Cut Noise</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="itemType"
                checked={!isNoise}
                onChange={() => setIsNoise(false)}
                className="form-radio text-green-600"
              />
              <span className="ml-2 text-gray-700">Keep Life</span>
            </label>
          </div>
          <button
            onClick={handleAddItem}
            className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition-all duration-200 shadow-md"
          >
            Add Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-red-100 p-4 rounded-md border border-red-200">
            <h4 className="text-xl font-bold text-red-800 mb-3">Noise to Cut</h4>
            {noiseLifeData.filter(item => item.type === 'noise').length === 0 ? (
              <p className="text-gray-600">Nothing identified to cut yet.</p>
            ) : (
              <ul className="space-y-2">
                {noiseLifeData.filter(item => item.type === 'noise').map((item) => (
                  <li key={item.id} className="flex items-center justify-between text-gray-700 bg-red-50 p-2 rounded-md">
                    <span className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-circle text-red-500"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg> {item.item}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-green-100 p-4 rounded-md border border-green-200">
            <h4 className="text-xl font-bold text-green-800 mb-3">Life to Keep</h4>
            {noiseLifeData.filter(item => item.type === 'life').length === 0 ? (
              <p className="text-gray-600">Nothing identified to keep yet.</p>
            ) : (
              <ul className="space-y-2">
                {noiseLifeData.filter(item => item.type === 'life').map((item) => (
                  <li key={item.id} className="flex items-center justify-between text-gray-700 bg-green-50 p-2 rounded-md">
                    <span className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.8"></path><path d="m15 2 7 7-7 7"></path></svg> {item.item}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-10 p-4 bg-orange-100 rounded-md text-orange-800 flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-leaf"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 15 2c-2.2 2.8-4.7 5-8 5a6 6 0 0 0-3 4c0 1 0 2 1 3a6 6 0 0 0 3 2l.2.2c-.3.2-.6.5-.8.8l-1.5 1.5c-.7.7-1.7 1-2.7 1C3 21 2 20.4 2 19c0-1 0-2 2-4h3l-1-1c-1.2-1.2-2-2.9-2-5a7 7 0 0 1 12-6.2c.2-.2.6-.4 1-.2 1.4.6 2.5 2.1 3 4.4 0 1 .4 2.6-.4 4.8-.7 2.2-2.3 4.3-5 5.7"></path></svg> {/* Leaf/Plant SVG for Stewardship */}
          <p className="font-semibold">"That each of them may eat and drink, and find satisfaction in all their toil." This is about stewardship, not scarcity.</p>
        </div>
        <p className="text-center italic text-gray-700 mt-8">Declare it: "I'm cutting noise, not life!"</p>
      </div>
    </div>
  );
};


// --- Sheet: Step 5 - Pray for Increase + Take Action ---
const Step5 = ({ actionPlanData, setActionPlanData, totalIncome }) => {
  const [newActionStep, setNewActionStep] = useState('');
  const [newActionTimeline, setNewActionTimeline] = useState('');
  const [prayerCalendar, setPrayerCalendar] = useState(Array(30).fill(false)); // State for 30-day prayer calendar

  const prayers = [
    "Day 1: Lord, grant me **clarity** to see my financial reality and make wise decisions. (Face Your Numbers)",
    "Day 2: Heavenly Father, show me where I can **increase** my income to better serve your purpose. (Pray for Increase)",
    "Day 3: God, help me to identify and **eliminate noise** in my spending, so I can focus on what truly matters. (Cut Noise, Not Life)",
    "Day 4: I pray for discipline to **automate my obedience** in saving and giving. (Automate Your Obedience)",
    "Day 5: Grant me wisdom, Lord, to **build my emergency fund**, creating an ark of security for my family. (Emergency Fund)",
    "Day 6: Father, bless my efforts to diligently track my finances, as your word instructs. (Face Your Numbers)",
    "Day 7: May opportunities for **income growth** multiply, aligning with your divine will. (Pray for Increase)",
    "Day 8: Help me, God, to discern between needs and wants, cutting expenses that don't serve my life. (Cut Noise, Not Life)",
    "Day 9: I commit to consistent saving, Lord, trusting your provision as I **automate** my financial habits. (Automate Your Obedience)",
    "Day 10: Strengthen my resolve to grow my **emergency fund**, a testament to my trust in your future provision. (Emergency Fund)",
    "Day 11: Lord, open my eyes to every detail of my financial state, that I may be a good steward. (Face Your Numbers)",
    "Day 12: I pray for creative ideas and divine connections that lead to **increased prosperity**. (Pray for Increase)",
    "Day 13: Guide me, Spirit, to live a life free from unnecessary distractions and wasteful spending. (Cut Noise, Not Life)",
    "Day 14: Thank you, Lord, for the power of **automation** in bringing order and consistency to my finances. (Automate Your Obedience)",
    "Day 15: Protect and grow my **emergency fund**, Lord, making it a reliable source in times of need. (Emergency Fund)",
    "Day 16: Give me courage, Father, to confront my financial numbers with honesty and a plan. (Face Your Numbers)",
    "Day 17: I ask for your blessing, Lord, upon my work and ventures, that they may yield abundant **increase**. (Pray for Increase)",
    "Day 18: Help me to declutter my financial life, removing anything that hinders my progress. (Cut Noise, Not Life)",
    "Day 19: I declare peace over my finances as I intentionally **automate** my savings and giving. (Automate Your Obedience)",
    "Day 20: May my **emergency fund** reflect your faithfulness and my commitment to financial prudence. (Emergency Fund)",
    "Day 21: Lord, grant me foresight and understanding to plan my finances with precision. (Face Your Numbers)",
    "Day 22: Ignite within me the passion and drive to pursue new avenues of **income and growth**. (Pray for Increase)",
    "Day 23: Thank you, God, for showing me how to live abundantly by cutting what is superfluous. (Cut Noise, Not Life)",
    "Day 24: I rejoice in the ease and effectiveness of **automated** financial habits, a gift from your wisdom. (Automate Your Obedience)",
    "Day 25: Let my **emergency fund** be a testimony of your peace that transcends all understanding. (Emergency Fund)",
    "Day 26: Father, reveal any hidden financial burdens and empower me to address them. (Face Your Numbers)",
    "Day 27: I pray for open doors and divine favor in my career and business for **supernatural increase**. (Pray for Increase)",
    "Day 28: Help me, Lord, to continually evaluate my spending, ensuring every dollar is aligned with my values. (Cut Noise, Not Life)",
    "Day 29: With every automated transfer, I sow seeds of financial freedom and future blessing. (Automate Your Obedience)",
    "Day 30: Thank you, God, for the complete security and peace that comes from a fully funded **emergency fund**. (Emergency Fund)"
  ];

  const handleAddAction = () => {
    if (newActionStep && newActionTimeline) {
      setActionPlanData([...actionPlanData, { id: generateId(), step: newActionStep, timeline: newActionTimeline, status: 'Planned' }]);
      setNewActionStep('');
      setNewActionTimeline('');
    }
  };

  const toggleActionStatus = (id) => {
    setActionPlanData(actionPlanData.map(item =>
      item.id === id ? { ...item, status: item.status === 'Planned' ? 'Completed' : 'Planned' } : item
    ));
  };

  const togglePrayerCompletion = (index) => {
    setPrayerCalendar(prev => prev.map((status, i) => (i === index ? !status : status)));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">5. Pray for Increase + Take Action</h2>
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        "The blessing of the Lord brings wealth, without painful toil for it." <br/> **Proverbs 10:22**
        You can only save as much as you earn.
        Pair your prayers with bold action to grow your income!
      </p>

      <div className="bg-teal-50 p-6 rounded-lg shadow-md border-t-4 border-teal-600 mb-8">
        <h3 className="text-2xl font-bold text-teal-800 mb-4 flex items-center"><Briefcase className="mr-2" /> Your Income Growth Action Plan</h3>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Action Step (e.g., Ask for raise)"
            value={newActionStep}
            onChange={(e) => setNewActionStep(e.target.value)}
            className="p-3 border border-gray-300 rounded-md flex-grow focus:ring-teal-500 focus:border-teal-500"
          />
          <input
            type="text"
            placeholder="Timeline (e.g., This month)"
            value={newActionTimeline}
            onChange={(e) => setNewActionTimeline(e.target.value)}
            className="p-3 border border-gray-300 rounded-md flex-grow focus:ring-teal-500 focus:border-teal-500"
          />
          <button
            onClick={handleAddAction}
            className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-all duration-200 shadow-md"
          >
            Add Action
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto mb-4 border border-teal-200 rounded-md">
          {actionPlanData.length === 0 ? (
            <p className="text-gray-500 text-center p-4">No action steps planned yet.</p>
          ) : (
            <table className="min-w-full bg-white text-sm">
              <thead className="sticky top-0 bg-teal-100">
                <tr>
                  <th className="py-2 px-4 text-left text-teal-800">Action Step</th>
                  <th className="py-2 px-4 text-left text-teal-800">Timeline</th>
                  <th className="py-2 px-4 text-left text-teal-800">Status</th>
                  <th className="py-2 px-4 text-left text-teal-800">Toggle</th>
                </tr>
              </thead>
              <tbody>
                {actionPlanData.map((item) => (
                  <tr key={item.id} className="border-b border-teal-100 last:border-0">
                    <td className="py-2 px-4">{item.step}</td>
                    <td className="py-2 px-4">{item.timeline}</td>
                    <td className={`py-2 px-4 font-semibold ${item.status === 'Completed' ? 'text-green-600' : 'text-blue-600'}`}>
                      {item.status}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => toggleActionStatus(item.id)}
                        className="text-teal-600 hover:text-teal-800 underline text-sm"
                      >
                        {item.status === 'Planned' ? 'Mark Complete' : 'Mark Planned'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="bg-emerald-50 p-6 rounded-lg shadow-md border-t-4 border-emerald-600 mb-8">
        <h3 className="text-2xl font-bold text-emerald-800 mb-4">Current Income Base</h3>
        <p className="text-gray-700 text-lg mb-4">Your current total income provides the foundation for growth:</p>
        <p className="text-4xl font-extrabold text-emerald-700 text-center">{formatCurrency(totalIncome)}</p>
        <div className="mt-6 p-4 bg-emerald-100 rounded-md text-emerald-800 flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-heart"><path d="M11 19h5a2 2 0 0 0 0-4h-3c-.6 0-1.2-.4-1.4-1l-.8-2-.2-.5C9.1 9.7 8.5 9 7.6 9H4c-.8 0-1.5.6-1.6 1.4-.4 4-1 6.3-1.4 7.2-.3.9-.2 1.8.3 2.5.5.7 1.3 1 2.2 1h6"></path><path d="M18.5 2h-3L12 6l5.5 5L22 6l-3.5-4Z"></path></svg> {/* Handshake/Heart for Blessing */}
          <p className="font-semibold">Pair your prayers with bold action. Every dollar earned moves you closer to your $20K milestone.</p>
        </div>
      </div>

      {/* 30-Day Prayer Calendar */}
      <div className="bg-fuchsia-50 p-6 rounded-lg shadow-md border-t-4 border-fuchsia-600">
        <h3 className="text-2xl font-bold text-fuchsia-800 mb-4 flex items-center"><Handshake className="mr-2" /> 30-Day Prayer Calendar</h3>
        <p className="text-gray-700 mb-6">Recite a different prayer daily, aligning your heart with God's plan for your finances. Check them off as you complete them!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prayers.map((prayer, index) => (
            <div key={index} className={`flex items-start gap-3 p-4 rounded-lg shadow-sm transition-all duration-200 ${
              prayerCalendar[index] ? 'bg-fuchsia-100 border-l-4 border-fuchsia-700' : 'bg-white border border-gray-200'
            }`}>
              <input
                type="checkbox"
                checked={prayerCalendar[index]}
                onChange={() => togglePrayerCompletion(index)}
                className="form-checkbox h-5 w-5 text-fuchsia-600 rounded-md mt-1 cursor-pointer"
              />
              <p className={`text-sm flex-grow ${prayerCalendar[index] ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                <span className="font-semibold">Day {index + 1}:</span> {prayer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- Main App Component ---
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [savingsData, setSavingsData] = useState({ emergencyFund: 0, emergencyFundGoal: 1000 });
  const [automationData, setAutomationData] = useState([]);
  const [noiseLifeData, setNoiseLifeData] = useState([]);
  const [actionPlanData, setActionPlanData] = useState([]);

  // Calculate total income for passing to Step 5
  const totalIncome = incomeData.reduce((sum, item) => sum + parseFloat(item.amount), 0);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 antialiased p-4">
      <div className="max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-2xl overflow-hidden">
        <Header setActiveTab={setActiveTab} />
        <main className="p-0"> {/* No padding here as inner components have their own */}
          {activeTab === 'dashboard' && (
            <Dashboard
              incomeData={incomeData}
              expenseData={expenseData}
              savingsData={savingsData}
            />
          )}
          {activeTab === 'step1' && (
            <Step1
              incomeData={incomeData}
              setIncomeData={setIncomeData}
              expenseData={expenseData}
              setExpenseData={setExpenseData}
            />
          )}
          {activeTab === 'step2' && (
            <Step2
              savingsData={savingsData}
              setSavingsData={setSavingsData}
            />
          )}
          {activeTab === 'step3' && (
            <Step3
              automationData={automationData}
              setAutomationData={setAutomationData}
            />
          )}
          {activeTab === 'step4' && (
            <Step4
              noiseLifeData={noiseLifeData}
              setNoiseLifeData={setNoiseLifeData}
            />
          )}
          {activeTab === 'step5' && (
            <Step5
              actionPlanData={actionPlanData}
              setActionPlanData={setActionPlanData}
              totalIncome={totalIncome} // Pass total income to Step5
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;