import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateVolumeTierPrice,
  calculateEscrowMilestones,
  formatINR,
  type PricingTier,
} from './pricing.ts';

const SAMPLE_TIERS: PricingTier[] = [
  { id: 'T1', name: 'Pilot Batch', minUnits: 250, maxUnits: 500, unitPrice: 380 },
  { id: 'T2', name: 'Production Run', minUnits: 501, maxUnits: 2000, unitPrice: 340, badge: 'Save ₹40' },
  { id: 'T3', name: 'Best Value Scale', minUnits: 2001, maxUnits: null, unitPrice: 295, badge: 'Free Freight' },
];

test('calculateVolumeTierPrice selects T1 for pilot quantity', () => {
  const result = calculateVolumeTierPrice(300, SAMPLE_TIERS);
  assert.equal(result.qualifiedTier.id, 'T1');
  assert.equal(result.unitPrice, 380);
  assert.equal(result.grossTotal, 114000);
  assert.equal(result.savingsVsBase, 0);
  assert.equal(result.marginLiftPercent, 0);
});

test('calculateVolumeTierPrice selects T2 for medium batch and calculates margin lift', () => {
  const result = calculateVolumeTierPrice(1000, SAMPLE_TIERS);
  assert.equal(result.qualifiedTier.id, 'T2');
  assert.equal(result.unitPrice, 340);
  assert.equal(result.grossTotal, 340000);
  assert.equal(result.savingsVsBase, 40000);
  assert.equal(result.marginLiftPercent, 11);
});

test('calculateVolumeTierPrice selects T3 for large scale volume', () => {
  const result = calculateVolumeTierPrice(5000, SAMPLE_TIERS);
  assert.equal(result.qualifiedTier.id, 'T3');
  assert.equal(result.unitPrice, 295);
  assert.equal(result.grossTotal, 1475000);
  assert.equal(result.savingsVsBase, 425000);
});

test('calculateEscrowMilestones splits contract precisely into 15%, 50%, and 35%', () => {
  const baseAmount = 116000;
  const schedule = calculateEscrowMilestones(baseAmount, 0.18);
  assert.equal(schedule.gstAmount, 20880);
  assert.equal(schedule.totalContractValue, 136880);
  assert.equal(schedule.stage1Deposit15, 20532);
  assert.equal(schedule.stage2Hold50, 68440);
  assert.equal(schedule.stage3Release35, 47908);
  assert.equal(
    schedule.stage1Deposit15 + schedule.stage2Hold50 + schedule.stage3Release35,
    schedule.totalContractValue
  );
});

test('formatINR formats currency symbol and amounts', () => {
  const formatted = formatINR(1475000);
  assert.ok(formatted.includes('14,75,000') || formatted.includes('1,475,000'));
});
