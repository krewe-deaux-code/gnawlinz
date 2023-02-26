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

/*
  *******************************
  ********************************
  *******  GENERATE SOUNDS  *******
  **********************************
  ***********************************
*/

export const complete = new Howl({
  src: [completeUrl]
});

export const hit = new Howl({
  src: [hitUrl]
});

export const dodge = new Howl({
  src: [dodgeUrl]
});

Howler.volume(0.3);
