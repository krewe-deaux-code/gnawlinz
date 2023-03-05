// import { sfxr } from 'jsfxr';
import { Howl, Howler } from 'howler';

/*
  **************************
  ***************************
  *******  SERIALIZED  *******
  *****************************
  ******************************
*/

const completeSound = {
  'oldParams': true,
  'wave_type': 1,
  'p_env_attack': 0,
  'p_env_sustain': 0.0061845641634239445,
  'p_env_punch': 0.33112352575202575,
  'p_env_decay': 0.42224467679257993,
  'p_base_freq': 0.6163338371900126,
  'p_freq_limit': 0,
  'p_freq_ramp': 0,
  'p_freq_dramp': 0,
  'p_vib_strength': 0,
  'p_vib_speed': 0,
  'p_arp_mod': 0.46100390698685967,
  'p_arp_speed': 0.615375664299941,
  'p_duty': 0,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0,
  'p_pha_offset': 0,
  'p_pha_ramp': 0,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0,
  'p_hpf_ramp': 0,
  'sound_vol': 0.017,
  'sample_rate': 44100,
  'sample_size': 8
};

const hitSound = {
  'oldParams': true,
  'wave_type': 3,
  'p_env_attack': 0,
  'p_env_sustain': 0.00497446798196104,
  'p_env_punch': 0,
  'p_env_decay': 0.27305602036773946,
  'p_base_freq': 0.702415552635868,
  'p_freq_limit': 0,
  'p_freq_ramp': -0.40721222573401317,
  'p_freq_dramp': 0,
  'p_vib_strength': 0,
  'p_vib_speed': 0,
  'p_arp_mod': 0,
  'p_arp_speed': 0,
  'p_duty': 0,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0,
  'p_pha_offset': 0,
  'p_pha_ramp': 0,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0,
  'p_hpf_ramp': 0,
  'sound_vol': 0.013,
  'sample_rate': 44100,
  'sample_size': 8
};

const dodgeSound = {
  'oldParams': true,
  'wave_type': 3,
  'p_env_attack': 0.17438131008273375,
  'p_env_sustain': 0.15637345181284174,
  'p_env_punch': 0.588797374183849,
  'p_env_decay': 0.29876599486352895,
  'p_base_freq': 0.9816929500795846,
  'p_freq_limit': 0,
  'p_freq_ramp': -0.3851615968243691,
  'p_freq_dramp': 0,
  'p_vib_strength': 0.4055071933338548,
  'p_vib_speed': 0.5738050940935221,
  'p_arp_mod': 0,
  'p_arp_speed': 0,
  'p_duty': 0,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0.31945267901102975,
  'p_pha_offset': 0.11394128305612272,
  'p_pha_ramp': -0.17563871418784363,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0.9767327697072554,
  'p_hpf_ramp': 0,
  'sound_vol': 0.019,
  'sample_rate': 44100,
  'sample_size': 8
};

const evacuateSound = {
  'oldParams': true,
  'wave_type': 0,
  'p_env_attack': 0,
  'p_env_sustain': 0.3332047155982645,
  'p_env_punch': 0,
  'p_env_decay': 0.265313020026675,
  'p_base_freq': 0.36430960298809556,
  'p_freq_limit': 0,
  'p_freq_ramp': 0.20630654229945344,
  'p_freq_dramp': -0.31,
  'p_vib_strength': 0,
  'p_vib_speed': 0,
  'p_arp_mod': 0,
  'p_arp_speed': 0,
  'p_duty': 0.11399599462626381,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0,
  'p_pha_offset': 0,
  'p_pha_ramp': 0,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0.17088982164722222,
  'p_hpf_ramp': 0,
  'sound_vol': 0.012,
  'sample_rate': 44100,
  'sample_size': 8
};

const wildCardSound = {
  'oldParams': true,
  'wave_type': 0,
  'p_env_attack': 0,
  'p_env_sustain': 0.12975759808014056,
  'p_env_punch': 0,
  'p_env_decay': 0.4366670390268864,
  'p_base_freq': 0.26150843740474156,
  'p_freq_limit': 0,
  'p_freq_ramp': 0.22123755074333254,
  'p_freq_dramp': 0,
  'p_vib_strength': 0,
  'p_vib_speed': 0,
  'p_arp_mod': 0,
  'p_arp_speed': 0,
  'p_duty': 0.5395903671219403,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0.4229457144736907,
  'p_pha_offset': 0,
  'p_pha_ramp': 0,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0,
  'p_hpf_ramp': 0,
  'sound_vol': 0.019,
  'sample_rate': 44100,
  'sample_size': 8
};

const terminator = {
  'oldParams': true,
  'wave_type': 3,
  'p_env_attack': 0,
  'p_env_sustain': 0.32279621528598357,
  'p_env_punch': 0.5986362017834299,
  'p_env_decay': 0.3825302387063124,
  'p_base_freq': 0.042851606687422,
  'p_freq_limit': 0,
  'p_freq_ramp': -0.3017604244048227,
  'p_freq_dramp': 0,
  'p_vib_strength': 0.11263370286703937,
  'p_vib_speed': 0.2595364546663241,
  'p_arp_mod': 0.5276094143998613,
  'p_arp_speed': 0.7475277782776559,
  'p_duty': 0,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0.3258507366785141,
  'p_pha_offset': 0,
  'p_pha_ramp': 0,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0,
  'p_hpf_ramp': 0,
  'sound_vol': 0.097,
  'sample_rate': 44100,
  'sample_size': 8
};

const batflying = {
  'oldParams': true,
  'wave_type': 3,
  'p_env_attack': 0,
  'p_env_sustain': 0.36010786351586044,
  'p_env_punch': 0.37914350035364347,
  'p_env_decay': 0.27766589396405994,
  'p_base_freq': 0.09337241584949481,
  'p_freq_limit': 0,
  'p_freq_ramp': 0,
  'p_freq_dramp': 0,
  'p_vib_strength': 0.5948722975251431,
  'p_vib_speed': 0.21335580806123558,
  'p_arp_mod': 0,
  'p_arp_speed': 0,
  'p_duty': 0,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0,
  'p_pha_offset': -0.167178036313927,
  'p_pha_ramp': -0.22900361316829876,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0,
  'p_hpf_ramp': 0,
  'sound_vol': 0.064,
  'sample_rate': 44100,
  'sample_size': 8
};

const popBurn = {
  'oldParams': true,
  'wave_type': 3,
  'p_env_attack': 0,
  'p_env_sustain': 0.33728909569224036,
  'p_env_punch': 0.573722527234594,
  'p_env_decay': 0.429202826199502,
  'p_base_freq': 0.5129251864764769,
  'p_freq_limit': 0,
  'p_freq_ramp': -0.31681442277662747,
  'p_freq_dramp': 0,
  'p_vib_strength': 0.25483380067234823,
  'p_vib_speed': 0.11015038021883274,
  'p_arp_mod': 0,
  'p_arp_speed': 0,
  'p_duty': 0,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0,
  'p_pha_offset': 0.1667113059792873,
  'p_pha_ramp': -0.21718457208422506,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0,
  'p_hpf_ramp': 0,
  'sound_vol': 0.129,
  'sample_rate': 44100,
  'sample_size': 8
};

const longBurn = {
  'oldParams': true,
  'wave_type': 3,
  'p_env_attack': 0,
  'p_env_sustain': 0.33728909569224036,
  'p_env_punch': 0.573722527234594,
  'p_env_decay': 0.792,
  'p_base_freq': 0.5129251864764769,
  'p_freq_limit': 0,
  'p_freq_ramp': -0.307,
  'p_freq_dramp': -0.063,
  'p_vib_strength': 0.25483380067234823,
  'p_vib_speed': 0.11015038021883274,
  'p_arp_mod': 0,
  'p_arp_speed': 0,
  'p_duty': 0,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0,
  'p_pha_offset': 0.1667113059792873,
  'p_pha_ramp': -0.21718457208422506,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0,
  'p_hpf_ramp': 0,
  'sound_vol': 0.129,
  'sample_rate': 44100,
  'sample_size': 8
};

const longSlide = {
  'oldParams': true,
  'wave_type': 3,
  'p_env_attack': 0,
  'p_env_sustain': 0.3095102323830176,
  'p_env_punch': 0.25787778773830994,
  'p_env_decay': 0.741,
  'p_base_freq': 0.127686041604414,
  'p_freq_limit': 0,
  'p_freq_ramp': -0.038,
  'p_freq_dramp': 0,
  'p_vib_strength': 0.21762095619600505,
  'p_vib_speed': 0.24683051053037722,
  'p_arp_mod': 0.42447187662669705,
  'p_arp_speed': 0.7775140898009093,
  'p_duty': 0,
  'p_duty_ramp': 0,
  'p_repeat_speed': 0.3738668124989096,
  'p_pha_offset': -0.036441424778258735,
  'p_pha_ramp': -0.0902635518753034,
  'p_lpf_freq': 1,
  'p_lpf_ramp': 0,
  'p_lpf_resonance': 0,
  'p_hpf_freq': 0,
  'p_hpf_ramp': 0,
  'sound_vol': 0.179,
  'sample_rate': 44100,
  'sample_size': 8
};

/*
  ***********************************
  **********************************
  *******  CLOUDINARY SRCS  *******
  ********************************
  *******************************
*/

const completeUrl = 'https://res.cloudinary.com/de0mhjdfg/video/upload/v1677436049/sounds/pickupCoin_uwwaos.wav';
const hitUrl = 'https://res.cloudinary.com/de0mhjdfg/video/upload/v1677436361/sounds/hit_xznp0f.wav';
const dodgeUrl = 'https://res.cloudinary.com/de0mhjdfg/video/upload/v1677444831/sounds/evade_mlgwsf.wav';
const evacuateUrl = 'https://res.cloudinary.com/de0mhjdfg/video/upload/v1677466224/sounds/evacuate_mcndzl.wav';
const wildCardUrl = 'https://res.cloudinary.com/de0mhjdfg/video/upload/v1677466376/sounds/wildcard_ndvygk.wav';

/*
  *******************************
  ********************************
  *******  GENERATE SOUNDS  *******
  **********************************
  ***********************************
*/

export const complete = new Howl({
  src: [completeUrl],
  volume: 1.0
});

export const hit = new Howl({
  src: [hitUrl],
  volume: 1.0
});

export const dodge = new Howl({
  src: [dodgeUrl],
  volume: 1.0
});

export const evacuate = new Howl({
  src: [evacuateUrl],
  volume: 0.7
});

export const wildCard = new Howl({
  src: [wildCardUrl],
  volume: 1.0
});

// Howler.volume(0.7);
