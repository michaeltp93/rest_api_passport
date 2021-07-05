import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
	'/special',
	passport.authenticate('jwt', { session: false }),
	(_, res) => {
		res.send('successs');
	}
);

export default router;
