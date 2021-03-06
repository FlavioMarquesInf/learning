const { parseStorageEvent } = require('../utilities');
const admin = require('../utilities/dev-admin');
const environment = require('../environments/environment.dev.json');
const UploadsOnDelete = require('./uploads-on-delete');
const sampleEvent = require('../sample-data/upload-on-delete.json');
const db = admin.firestore();
const name = `${
  environment.paths.uploads
}/5ccM4M3aaS3IolEnAKWB/chrisesplin-headshot-6-600x600.jpg`;
const customEvent = { ...sampleEvent, name, md5Hash: 'on-delete-test' };

describe('UploadsOnDelete', () => {
  const { md5Hash, noteId } = parseStorageEvent(customEvent);
  const noteRef = db.collection(environment.collections.notes).doc(noteId);
  const imageA = { exists: true };
  const imageB = { exists: true };

  beforeAll(done => {
    Promise.resolve()
      .then(() => noteRef.delete())
      .then(() => noteRef.set({ images: { [md5Hash]: imageA, imageB } }))
      .then(() => done(), done.fail);
  });

  let uploadsOnDelete, event;
  beforeEach(() => {
    event = { ...customEvent };
    uploadsOnDelete = UploadsOnDelete({ admin, environment });
  });

  describe('functionality', () => {
    let result;
    beforeEach(done => {
      uploadsOnDelete(event)
        .then(imageRef => imageRef.get())
        .then(doc => {
          result = doc.data();
          return done();
        })
        .catch(done.fail);
    });

    it('should delete the image', () => {
      const expected = {
        images: {
          imageB,
        },
      };

      expect(result).toEqual(expected);
    });
  });
});
