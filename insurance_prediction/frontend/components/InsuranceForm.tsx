'use client';

import { useState } from 'react';
import axios from 'axios';
import { InsuranceFormData, PredictionResponse } from '@/types/insurance';

export default function InsuranceForm() {
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male',
    bmi: '',
    children: '0',
    smoker: 'no',
    region: 'northeast'
  });
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload: InsuranceFormData = {
      age: Number(formData.age),
      sex: formData.sex === 'male' ? 1 : 0,
      bmi: Number(formData.bmi),
      children: Number(formData.children),
      smoker: formData.smoker === 'yes' ? 1 : 0,
      region_northwest: formData.region === 'northwest' ? 1 : 0,
      region_southeast: formData.region === 'southeast' ? 1 : 0,
      region_southwest: formData.region === 'southwest' ? 1 : 0
    };

    try {
      const response = await axios.post<PredictionResponse>(
        'http://localhost:5000/predict',
        payload
      );
      setPrediction(response.data.predicted_charges);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Insurance Charge Predictor</h1>
            <p className="text-gray-600">Get an estimate of your insurance charges</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  required
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                <select
                  value={formData.sex}
                  onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">BMI</label>
                <input
                  type="number"
                  required
                  step="0.1"
                  min="10"
                  max="60"
                  value={formData.bmi}
                  onChange={(e) => setFormData({ ...formData, bmi: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Body Mass Index"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                <select
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {[0, 1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Smoker</label>
                <select
                  value={formData.smoker}
                  onChange={(e) => setFormData({ ...formData, smoker: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="northeast">Northeast</option>
                  <option value="northwest">Northwest</option>
                  <option value="southeast">Southeast</option>
                  <option value="southwest">Southwest</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Calculating...' : 'Predict Insurance Charges'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {prediction !== null && (
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border-2 border-indigo-200">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Predicted Insurance Charges</h2>
              <p className="text-4xl font-bold text-indigo-600">
                ${prediction.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mt-2">Estimated annual premium</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
