import * as migration_20260920_151335_cms_baseline from './20260920_151335_cms_baseline';
import * as migration_20260920_152532 from './20260920_152532';
import * as migration_20260920_160305_post_cover_upload from './20260920_160305_post_cover_upload';

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
  {
    up: migration_20260920_160305_post_cover_upload.up,
    down: migration_20260920_160305_post_cover_upload.down,
    name: '20260920_160305_post_cover_upload',
  },
];
