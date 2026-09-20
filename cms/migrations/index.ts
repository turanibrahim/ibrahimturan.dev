import * as migration_20260920_151335_cms_baseline from './20260920_151335_cms_baseline';
import * as migration_20260920_152532 from './20260920_152532';

export const migrations = [
  {
    up: migration_20260920_151335_cms_baseline.up,
    down: migration_20260920_151335_cms_baseline.down,
    name: '20260920_151335_cms_baseline',
  },
  {
    up: migration_20260920_152532.up,
    down: migration_20260920_152532.down,
    name: '20260920_152532',
  },
];
