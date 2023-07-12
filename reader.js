() => {
  const ctx = {
    nbtLoop: (buffer, offset) => {
      const values = []
      while (buffer[offset] != 0) {
        const n = ctx.nbt(buffer, offset)
        values.push(n.value)
        offset += n.size
      }
      return { value: values, size: buffer.length - offset }
    },
    byterot: (buffer, offset) => {
      const val = buffer.readUint8(offset)
      return { value: (val * (360 / 256)), size: 1 }
    },
    i8: native.i8,
    u8: native.u8,
    i16: native.i16,
    u16: native.u16,
    i32: native.i32,
    u32: native.u32,
    f32: native.f32,
    f64: native.f64,
    li8: native.li8,
    lu8: native.lu8,
    li16: native.li16,
    lu16: native.lu16,
    li32: native.li32,
    lu32: native.lu32,
    lf32: native.lf32,
    lf64: native.lf64,
    i64: native.i64,
    li64: native.li64,
    u64: native.u64,
    lu64: native.lu64,
    varint: native.varint,
    bool: native.bool,
    pstring: native.pstring,
    buffer: native.buffer,
    void: native.void,
    bitfield: native.bitfield,
    cstring: native.cstring,
    mapper: native.mapper,
    varint64: native.varint64,
    zigzag32: native.zigzag32,
    zigzag64: native.zigzag64,
    uuid: native.uuid,
    bitflags: native.bitflags,
    restBuffer: native.restBuffer,
    encapsulated: native.encapsulated,
    nbt: native.nbt,
    lnbt: native.lnbt,
    enum_size_based_on_values_len: native.enum_size_based_on_values_len,
    MapInfo: native.MapInfo,
    BehaviourPackInfos: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li16)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: uuid, size: uuidSize } = (ctx.string)(buffer, offset)
        let { value: version, size: versionSize } = (ctx.string)(buffer, offset + uuidSize)
        let { value: size1, size: size1Size } = (ctx.lu64)(buffer, offset + uuidSize + versionSize)
        let { value: content_key, size: content_keySize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size)
        let { value: sub_pack_name, size: sub_pack_nameSize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize)
        let { value: content_identity, size: content_identitySize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize)
        let { value: has_scripts, size: has_scriptsSize } = (ctx.bool)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize)
        return { value: { uuid, version, size: size1, content_key, sub_pack_name, content_identity, has_scripts }, size: uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize + has_scriptsSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    TexturePackInfos: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li16)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: uuid, size: uuidSize } = (ctx.string)(buffer, offset)
        let { value: version, size: versionSize } = (ctx.string)(buffer, offset + uuidSize)
        let { value: size1, size: size1Size } = (ctx.lu64)(buffer, offset + uuidSize + versionSize)
        let { value: content_key, size: content_keySize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size)
        let { value: sub_pack_name, size: sub_pack_nameSize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize)
        let { value: content_identity, size: content_identitySize } = (ctx.string)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize)
        let { value: has_scripts, size: has_scriptsSize } = (ctx.bool)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize)
        let { value: rtx_enabled, size: rtx_enabledSize } = (ctx.bool)(buffer, offset + uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize + has_scriptsSize)
        return { value: { uuid, version, size: size1, content_key, sub_pack_name, content_identity, has_scripts, rtx_enabled }, size: uuidSize + versionSize + size1Size + content_keySize + sub_pack_nameSize + content_identitySize + has_scriptsSize + rtx_enabledSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    ResourcePackIdVersions: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: uuid, size: uuidSize } = (ctx.string)(buffer, offset)
        let { value: version, size: versionSize } = (ctx.string)(buffer, offset + uuidSize)
        let { value: name, size: nameSize } = (ctx.string)(buffer, offset + uuidSize + versionSize)
        return { value: { uuid, version, name }, size: uuidSize + versionSize + nameSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    ResourcePackIds: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li16)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.string)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Experiment: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: enabled, size: enabledSize } = (ctx.bool)(buffer, offset + nameSize)
      return { value: { name, enabled }, size: nameSize + enabledSize}
    },
    Experiments: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.Experiment)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    GameMode: (buffer, offset) => {
      const { value, size } = (ctx.zigzag32)(buffer, offset)
      return { value: {"0":"survival","1":"creative","2":"adventure","3":"survival_spectator","4":"creative_spectator","5":"fallback","6":"spectator"}[value] || value, size }
    },
    GameRule: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: editable, size: editableSize } = (ctx.bool)(buffer, offset + nameSize)
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"1":"bool","2":"int","3":"float"}[value] || value, size }
      })(buffer, offset + nameSize + editableSize)
      let { value: value1, size: value1Size } = ((buffer, offset) => {
        switch (type) {
          case "bool": return (ctx.bool)(buffer, offset)
          case "int": return (ctx.zigzag32)(buffer, offset)
          case "float": return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + nameSize + editableSize + typeSize)
      return { value: { name, editable, type, value: value1 }, size: nameSize + editableSize + typeSize + value1Size}
    },
    GameRules: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.GameRule)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Blob: (buffer, offset) => {
      let { value: hash, size: hashSize } = (ctx.lu64)(buffer, offset)
      let { value: payload, size: payloadSize } = (ctx.ByteArray)(buffer, offset + hashSize)
      return { value: { hash, payload }, size: hashSize + payloadSize}
    },
    BlockProperties: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
        let { value: state, size: stateSize } = (ctx.nbt)(buffer, offset + name1Size)
        return { value: { name: name1, state }, size: name1Size + stateSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Itemstates: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
        let { value: runtime_id, size: runtime_idSize } = (ctx.li16)(buffer, offset + name1Size)
        let { value: component_based, size: component_basedSize } = (ctx.bool)(buffer, offset + name1Size + runtime_idSize)
        return { value: { name: name1, runtime_id, component_based }, size: name1Size + runtime_idSize + component_basedSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    ItemExtraDataWithBlockingTick: (buffer, offset) => {
      let { value: has_nbt, size: has_nbtSize } = ((buffer, offset) => {
        const { value, size } = (ctx.lu16)(buffer, offset)
        return { value: {"0":false,"65535":true}[value] || value, size }
      })(buffer, offset)
      let { value: nbt, size: nbtSize } = ((buffer, offset) => {
        switch (has_nbt) {
          case true: return ((buffer, offset) => {
            let { value: version, size: versionSize } = (ctx.u8)(buffer, offset)
            let { value: nbt1, size: nbt1Size } = (ctx.lnbt)(buffer, offset + versionSize)
            return { value: { version, nbt: nbt1 }, size: versionSize + nbt1Size}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + has_nbtSize)
      let { value: can_place_on, size: can_place_onSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.ShortString)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + has_nbtSize + nbtSize)
      let { value: can_destroy, size: can_destroySize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.ShortString)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + has_nbtSize + nbtSize + can_place_onSize)
      let { value: blocking_tick, size: blocking_tickSize } = (ctx.li64)(buffer, offset + has_nbtSize + nbtSize + can_place_onSize + can_destroySize)
      return { value: { has_nbt, nbt, can_place_on, can_destroy, blocking_tick }, size: has_nbtSize + nbtSize + can_place_onSize + can_destroySize + blocking_tickSize}
    },
    ItemExtraDataWithoutBlockingTick: (buffer, offset) => {
      let { value: has_nbt, size: has_nbtSize } = ((buffer, offset) => {
        const { value, size } = (ctx.lu16)(buffer, offset)
        return { value: {"0":false,"65535":true}[value] || value, size }
      })(buffer, offset)
      let { value: nbt, size: nbtSize } = ((buffer, offset) => {
        switch (has_nbt) {
          case true: return ((buffer, offset) => {
            let { value: version, size: versionSize } = (ctx.u8)(buffer, offset)
            let { value: nbt1, size: nbt1Size } = (ctx.lnbt)(buffer, offset + versionSize)
            return { value: { version, nbt: nbt1 }, size: versionSize + nbt1Size}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + has_nbtSize)
      let { value: can_place_on, size: can_place_onSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.ShortString)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + has_nbtSize + nbtSize)
      let { value: can_destroy, size: can_destroySize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.ShortString)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + has_nbtSize + nbtSize + can_place_onSize)
      return { value: { has_nbt, nbt, can_place_on, can_destroy }, size: has_nbtSize + nbtSize + can_place_onSize + can_destroySize}
    },
    ItemLegacy: (buffer, offset) => {
      let { value: network_id, size: network_idSize } = (ctx.zigzag32)(buffer, offset)
      let { value: count, size: countSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.lu16)(buffer, offset)
        }
      })(buffer, offset + network_idSize)
      let { value: metadata, size: metadataSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.varint)(buffer, offset)
        }
      })(buffer, offset + network_idSize + countSize)
      let { value: block_runtime_id, size: block_runtime_idSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.zigzag32)(buffer, offset)
        }
      })(buffer, offset + network_idSize + countSize + metadataSize)
      let { value: extra, size: extraSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return ((buffer, offset) => {
            switch (network_id) {
              case ctx.ShieldItemID: return ((buffer, offset) => {
                const payloadSize = (ctx.varint)(buffer, offset)
                  const { value, size } = ctx.ItemExtraDataWithBlockingTick(buffer, offset + payloadSize.size)
                  return { value, size: size + payloadSize.size }
              })(buffer, offset)
              default: return ((buffer, offset) => {
                const payloadSize = (ctx.varint)(buffer, offset)
                  const { value, size } = ctx.ItemExtraDataWithoutBlockingTick(buffer, offset + payloadSize.size)
                  return { value, size: size + payloadSize.size }
              })(buffer, offset)
            }
          })(buffer, offset)
        }
      })(buffer, offset + network_idSize + countSize + metadataSize + block_runtime_idSize)
      return { value: { network_id, count, metadata, block_runtime_id, extra }, size: network_idSize + countSize + metadataSize + block_runtime_idSize + extraSize}
    },
    Item: (buffer, offset) => {
      let { value: network_id, size: network_idSize } = (ctx.zigzag32)(buffer, offset)
      let { value: count, size: countSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.lu16)(buffer, offset)
        }
      })(buffer, offset + network_idSize)
      let { value: metadata, size: metadataSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.varint)(buffer, offset)
        }
      })(buffer, offset + network_idSize + countSize)
      let { value: has_stack_id, size: has_stack_idSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.u8)(buffer, offset)
        }
      })(buffer, offset + network_idSize + countSize + metadataSize)
      let { value: stack_id, size: stack_idSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return ((buffer, offset) => {
            switch (has_stack_id) {
              case 0: return (ctx.void)(buffer, offset)
              default: return (ctx.zigzag32)(buffer, offset)
            }
          })(buffer, offset)
        }
      })(buffer, offset + network_idSize + countSize + metadataSize + has_stack_idSize)
      let { value: block_runtime_id, size: block_runtime_idSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return (ctx.zigzag32)(buffer, offset)
        }
      })(buffer, offset + network_idSize + countSize + metadataSize + has_stack_idSize + stack_idSize)
      let { value: extra, size: extraSize } = ((buffer, offset) => {
        switch (network_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return ((buffer, offset) => {
            switch (network_id) {
              case ctx.ShieldItemID: return ((buffer, offset) => {
                const payloadSize = (ctx.varint)(buffer, offset)
                  const { value, size } = ctx.ItemExtraDataWithBlockingTick(buffer, offset + payloadSize.size)
                  return { value, size: size + payloadSize.size }
              })(buffer, offset)
              default: return ((buffer, offset) => {
                const payloadSize = (ctx.varint)(buffer, offset)
                  const { value, size } = ctx.ItemExtraDataWithoutBlockingTick(buffer, offset + payloadSize.size)
                  return { value, size: size + payloadSize.size }
              })(buffer, offset)
            }
          })(buffer, offset)
        }
      })(buffer, offset + network_idSize + countSize + metadataSize + has_stack_idSize + stack_idSize + block_runtime_idSize)
      return { value: { network_id, count, metadata, has_stack_id, stack_id, block_runtime_id, extra }, size: network_idSize + countSize + metadataSize + has_stack_idSize + stack_idSize + block_runtime_idSize + extraSize}
    },
    vec3i: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.zigzag32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.zigzag32)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.zigzag32)(buffer, offset + xSize + ySize)
      return { value: { x, y, z }, size: xSize + ySize + zSize}
    },
    vec3u: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.varint)(buffer, offset)
      let { value: y, size: ySize } = (ctx.varint)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.varint)(buffer, offset + xSize + ySize)
      return { value: { x, y, z }, size: xSize + ySize + zSize}
    },
    vec3f: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.lf32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.lf32)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.lf32)(buffer, offset + xSize + ySize)
      return { value: { x, y, z }, size: xSize + ySize + zSize}
    },
    vec2f: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.lf32)(buffer, offset)
      let { value: z, size: zSize } = (ctx.lf32)(buffer, offset + xSize)
      return { value: { x, z }, size: xSize + zSize}
    },
    MetadataDictionary: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: key, size: keySize } = ((buffer, offset) => {
          const { value, size } = (ctx.varint)(buffer, offset)
          return { value: {"0":"flags","1":"health","2":"variant","3":"color","4":"nametag","5":"owner_eid","6":"target_eid","7":"air","8":"potion_color","9":"potion_ambient","10":"jump_duration","11":"hurt_time","12":"hurt_direction","13":"paddle_time_left","14":"paddle_time_right","15":"experience_value","16":"minecart_display_block","17":"minecart_display_offset","18":"minecart_has_display","20":"old_swell","21":"swell_dir","22":"charge_amount","23":"enderman_held_runtime_id","24":"entity_age","26":"player_flags","27":"player_index","28":"player_bed_position","29":"fireball_power_x","30":"fireball_power_y","31":"fireball_power_z","32":"aux_power","33":"fish_x","34":"fish_z","35":"fish_angle","36":"potion_aux_value","37":"lead_holder_eid","38":"scale","39":"interactive_tag","40":"npc_skin_id","41":"url_tag","42":"max_airdata_max_air","43":"mark_variant","44":"container_type","45":"container_base_size","46":"container_extra_slots_per_strength","47":"block_target","48":"wither_invulnerable_ticks","49":"wither_target_1","50":"wither_target_2","51":"wither_target_3","52":"aerial_attack","53":"boundingbox_width","54":"boundingbox_height","55":"fuse_length","56":"rider_seat_position","57":"rider_rotation_locked","58":"rider_max_rotation","59":"rider_min_rotation","60":"rider_rotation_offset","61":"area_effect_cloud_radius","62":"area_effect_cloud_waiting","63":"area_effect_cloud_particle_id","64":"shulker_peek_id","65":"shulker_attach_face","66":"shulker_attached","67":"shulker_attach_pos","68":"trading_player_eid","69":"trading_career","70":"has_command_block","71":"command_block_command","72":"command_block_last_output","73":"command_block_track_output","74":"controlling_rider_seat_number","75":"strength","76":"max_strength","77":"spell_casting_color","78":"limited_life","79":"armor_stand_pose_index","80":"ender_crystal_time_offset","81":"always_show_nametag","82":"color_2","83":"name_author","84":"score_tag","85":"balloon_attached_entity","86":"pufferfish_size","87":"bubble_time","88":"agent","89":"sitting_amount","90":"sitting_amount_previous","91":"eating_counter","92":"flags_extended","93":"laying_amount","94":"laying_amount_previous","95":"duration","96":"spawn_time","97":"change_rate","98":"change_on_pickup","99":"pickup_count","100":"interact_text","101":"trade_tier","102":"max_trade_tier","103":"trade_experience","104":"skin_id","105":"spawning_frames","106":"command_block_tick_delay","107":"command_block_execute_on_first_tick","108":"ambient_sound_interval","109":"ambient_sound_interval_range","110":"ambient_sound_event_name","111":"fall_damage_multiplier","112":"name_raw_text","113":"can_ride_target","114":"low_tier_cured_discount","115":"high_tier_cured_discount","116":"nearby_cured_discount","117":"nearby_cured_discount_timestamp","118":"hitbox","119":"is_buoyant","120":"base_runtime_id","121":"freezing_effect_strength","122":"buoyancy_data","123":"goat_horn_count","124":"update_properties","125":"movement_sound_distance_offset","126":"heartbeat_interval_ticks","127":"heartbeat_sound_event"}[value] || value, size }
        })(buffer, offset)
        let { value: type1, size: type1Size } = ((buffer, offset) => {
          const { value, size } = (ctx.varint)(buffer, offset)
          return { value: {"0":"byte","1":"short","2":"int","3":"float","4":"string","5":"compound","6":"vec3i","7":"long","8":"vec3f"}[value] || value, size }
        })(buffer, offset + keySize)
        let { value: value2, size: value2Size } = ((buffer, offset) => {
          switch (key) {
            case "flags": return (ctx.MetadataFlags1)(buffer, offset)
            case "flags_extended": return (ctx.MetadataFlags2)(buffer, offset)
            default: return ((buffer, offset) => {
              switch (type1) {
                case "byte": return (ctx.i8)(buffer, offset)
                case "short": return (ctx.li16)(buffer, offset)
                case "int": return (ctx.zigzag32)(buffer, offset)
                case "float": return (ctx.lf32)(buffer, offset)
                case "string": return (ctx.string)(buffer, offset)
                case "compound": return (ctx.nbt)(buffer, offset)
                case "vec3i": return (ctx.vec3i)(buffer, offset)
                case "long": return (ctx.zigzag64)(buffer, offset)
                case "vec3f": return (ctx.vec3f)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset)
          }
        })(buffer, offset + keySize + type1Size)
        return { value: { key, type: type1, value: value2 }, size: keySize + type1Size + value2Size}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Link: (buffer, offset) => {
      let { value: ridden_entity_id, size: ridden_entity_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: rider_entity_id, size: rider_entity_idSize } = (ctx.zigzag64)(buffer, offset + ridden_entity_idSize)
      let { value: type, size: typeSize } = (ctx.u8)(buffer, offset + ridden_entity_idSize + rider_entity_idSize)
      let { value: immediate, size: immediateSize } = (ctx.bool)(buffer, offset + ridden_entity_idSize + rider_entity_idSize + typeSize)
      let { value: rider_initiated, size: rider_initiatedSize } = (ctx.bool)(buffer, offset + ridden_entity_idSize + rider_entity_idSize + typeSize + immediateSize)
      return { value: { ridden_entity_id, rider_entity_id, type, immediate, rider_initiated }, size: ridden_entity_idSize + rider_entity_idSize + typeSize + immediateSize + rider_initiatedSize}
    },
    Links: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.Link)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    EntityAttributes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
        let { value: min, size: minSize } = (ctx.lf32)(buffer, offset + name1Size)
        let { value: value2, size: value2Size } = (ctx.lf32)(buffer, offset + name1Size + minSize)
        let { value: max, size: maxSize } = (ctx.lf32)(buffer, offset + name1Size + minSize + value2Size)
        return { value: { name: name1, min, value: value2, max }, size: name1Size + minSize + value2Size + maxSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    EntityProperties: (buffer, offset) => {
      let { value: ints, size: intsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: index, size: indexSize } = (ctx.varint)(buffer, offset)
          let { value: value2, size: value2Size } = (ctx.zigzag32)(buffer, offset + indexSize)
          return { value: { index, value: value2 }, size: indexSize + value2Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      let { value: floats, size: floatsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: index, size: indexSize } = (ctx.varint)(buffer, offset)
          let { value: value2, size: value2Size } = (ctx.lf32)(buffer, offset + indexSize)
          return { value: { index, value: value2 }, size: indexSize + value2Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + intsSize)
      return { value: { ints, floats }, size: intsSize + floatsSize}
    },
    Rotation: (buffer, offset) => {
      let { value: yaw, size: yawSize } = (ctx.byterot)(buffer, offset)
      let { value: pitch, size: pitchSize } = (ctx.byterot)(buffer, offset + yawSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.byterot)(buffer, offset + yawSize + pitchSize)
      return { value: { yaw, pitch, head_yaw }, size: yawSize + pitchSize + head_yawSize}
    },
    BlockCoordinates: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.zigzag32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.varint)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.zigzag32)(buffer, offset + xSize + ySize)
      return { value: { x, y, z }, size: xSize + ySize + zSize}
    },
    PlayerAttributes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: min, size: minSize } = (ctx.lf32)(buffer, offset)
        let { value: max, size: maxSize } = (ctx.lf32)(buffer, offset + minSize)
        let { value: current, size: currentSize } = (ctx.lf32)(buffer, offset + minSize + maxSize)
        let { value: default1, size: default1Size } = (ctx.lf32)(buffer, offset + minSize + maxSize + currentSize)
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset + minSize + maxSize + currentSize + default1Size)
        let { value: modifiers, size: modifiersSize } = ((buffer, offset) => {
          const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
          if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
          const data = []
          let size = countSize
          for (let i = 0; i < count; i++) {
            const elem = ((buffer, offset) => {
            let { value: id, size: idSize } = (ctx.string)(buffer, offset)
            let { value: name2, size: name2Size } = (ctx.string)(buffer, offset + idSize)
            let { value: amount, size: amountSize } = (ctx.lf32)(buffer, offset + idSize + name2Size)
            let { value: operation, size: operationSize } = (ctx.li32)(buffer, offset + idSize + name2Size + amountSize)
            let { value: operand, size: operandSize } = (ctx.li32)(buffer, offset + idSize + name2Size + amountSize + operationSize)
            let { value: serializable, size: serializableSize } = (ctx.bool)(buffer, offset + idSize + name2Size + amountSize + operationSize + operandSize)
            return { value: { id, name: name2, amount, operation, operand, serializable }, size: idSize + name2Size + amountSize + operationSize + operandSize + serializableSize}
          })(buffer, offset + size)
            data.push(elem.value)
            size += elem.size
          }
          return { value: data, size }
        })(buffer, offset + minSize + maxSize + currentSize + default1Size + name1Size)
        return { value: { min, max, current, default: default1, name: name1, modifiers }, size: minSize + maxSize + currentSize + default1Size + name1Size + modifiersSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    TransactionUseItem: (buffer, offset) => {
      let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"click_block","1":"click_air","2":"break_block"}[value] || value, size }
      })(buffer, offset)
      let { value: block_position, size: block_positionSize } = (ctx.vec3i)(buffer, offset + action_typeSize)
      let { value: face, size: faceSize } = (ctx.varint)(buffer, offset + action_typeSize + block_positionSize)
      let { value: hotbar_slot, size: hotbar_slotSize } = (ctx.varint)(buffer, offset + action_typeSize + block_positionSize + faceSize)
      let { value: held_item, size: held_itemSize } = (ctx.Item)(buffer, offset + action_typeSize + block_positionSize + faceSize + hotbar_slotSize)
      let { value: player_pos, size: player_posSize } = (ctx.vec3f)(buffer, offset + action_typeSize + block_positionSize + faceSize + hotbar_slotSize + held_itemSize)
      let { value: click_pos, size: click_posSize } = (ctx.vec3f)(buffer, offset + action_typeSize + block_positionSize + faceSize + hotbar_slotSize + held_itemSize + player_posSize)
      let { value: block_runtime_id, size: block_runtime_idSize } = (ctx.varint)(buffer, offset + action_typeSize + block_positionSize + faceSize + hotbar_slotSize + held_itemSize + player_posSize + click_posSize)
      return { value: { action_type, block_position, face, hotbar_slot, held_item, player_pos, click_pos, block_runtime_id }, size: action_typeSize + block_positionSize + faceSize + hotbar_slotSize + held_itemSize + player_posSize + click_posSize + block_runtime_idSize}
    },
    TransactionActions: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: source_type, size: source_typeSize } = ((buffer, offset) => {
          const { value, size } = (ctx.varint)(buffer, offset)
          return { value: {"0":"container","1":"global","2":"world_interaction","3":"creative","100":"craft_slot","99999":"craft"}[value] || value, size }
        })(buffer, offset)
        let { value: inventory_id, size: inventory_idSize } = ((buffer, offset) => {
          switch (source_type) {
            case "container": return (ctx.WindowIDVarint)(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + source_typeSize)
        let { value: action, size: actionSize } = ((buffer, offset) => {
          switch (source_type) {
            case "craft": return (ctx.varint)(buffer, offset)
            case "craft_slot": return (ctx.varint)(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + source_typeSize + inventory_idSize)
        let { value: flags, size: flagsSize } = ((buffer, offset) => {
          switch (source_type) {
            case "world_interaction": return (ctx.varint)(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + source_typeSize + inventory_idSize + actionSize)
        let { value: slot, size: slotSize } = (ctx.varint)(buffer, offset + source_typeSize + inventory_idSize + actionSize + flagsSize)
        let { value: old_item, size: old_itemSize } = (ctx.Item)(buffer, offset + source_typeSize + inventory_idSize + actionSize + flagsSize + slotSize)
        let { value: new_item, size: new_itemSize } = (ctx.Item)(buffer, offset + source_typeSize + inventory_idSize + actionSize + flagsSize + slotSize + old_itemSize)
        return { value: { source_type, inventory_id, action, flags, slot, old_item, new_item }, size: source_typeSize + inventory_idSize + actionSize + flagsSize + slotSize + old_itemSize + new_itemSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    TransactionLegacy: (buffer, offset) => {
      let { value: legacy_request_id, size: legacy_request_idSize } = (ctx.zigzag32)(buffer, offset)
      let { value: legacy_transactions, size: legacy_transactionsSize } = ((buffer, offset) => {
        switch (legacy_request_id) {
          case 0: return (ctx.void)(buffer, offset)
          default: return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = ((buffer, offset) => {
              let { value: container_id, size: container_idSize } = (ctx.u8)(buffer, offset)
              let { value: changed_slots, size: changed_slotsSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = ((buffer, offset) => {
                  let { value: slot_id, size: slot_idSize } = (ctx.u8)(buffer, offset)
                  return { value: { slot_id }, size: slot_idSize}
                })(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + container_idSize)
              return { value: { container_id, changed_slots }, size: container_idSize + changed_slotsSize}
            })(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
        }
      })(buffer, offset + legacy_request_idSize)
      return { value: { legacy_request_id, legacy_transactions }, size: legacy_request_idSize + legacy_transactionsSize}
    },
    Transaction: (buffer, offset) => {
      let { value: legacy, size: legacySize } = (ctx.TransactionLegacy)(buffer, offset)
      let { value: transaction_type, size: transaction_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"normal","1":"inventory_mismatch","2":"item_use","3":"item_use_on_entity","4":"item_release"}[value] || value, size }
      })(buffer, offset + legacySize)
      let { value: actions, size: actionsSize } = (ctx.TransactionActions)(buffer, offset + legacySize + transaction_typeSize)
      let { value: transaction_data, size: transaction_dataSize } = ((buffer, offset) => {
        switch (transaction_type) {
          case "normal": return (ctx.void)(buffer, offset)
          case "inventory_mismatch": return (ctx.void)(buffer, offset)
          case "item_use": return (ctx.TransactionUseItem)(buffer, offset)
          case "item_use_on_entity": return ((buffer, offset) => {
            let { value: entity_runtime_id, size: entity_runtime_idSize } = (ctx.varint64)(buffer, offset)
            let { value: action_type1, size: action_type1Size } = ((buffer, offset) => {
              const { value, size } = (ctx.varint)(buffer, offset)
              return { value: {"0":"interact","1":"attack"}[value] || value, size }
            })(buffer, offset + entity_runtime_idSize)
            let { value: hotbar_slot1, size: hotbar_slot1Size } = (ctx.zigzag32)(buffer, offset + entity_runtime_idSize + action_type1Size)
            let { value: held_item1, size: held_item1Size } = (ctx.Item)(buffer, offset + entity_runtime_idSize + action_type1Size + hotbar_slot1Size)
            let { value: player_pos1, size: player_pos1Size } = (ctx.vec3f)(buffer, offset + entity_runtime_idSize + action_type1Size + hotbar_slot1Size + held_item1Size)
            let { value: click_pos1, size: click_pos1Size } = (ctx.vec3f)(buffer, offset + entity_runtime_idSize + action_type1Size + hotbar_slot1Size + held_item1Size + player_pos1Size)
            return { value: { entity_runtime_id, action_type: action_type1, hotbar_slot: hotbar_slot1, held_item: held_item1, player_pos: player_pos1, click_pos: click_pos1 }, size: entity_runtime_idSize + action_type1Size + hotbar_slot1Size + held_item1Size + player_pos1Size + click_pos1Size}
          })(buffer, offset)
          case "item_release": return ((buffer, offset) => {
            let { value: action_type1, size: action_type1Size } = ((buffer, offset) => {
              const { value, size } = (ctx.varint)(buffer, offset)
              return { value: {"0":"release","1":"consume"}[value] || value, size }
            })(buffer, offset)
            let { value: hotbar_slot1, size: hotbar_slot1Size } = (ctx.zigzag32)(buffer, offset + action_type1Size)
            let { value: held_item1, size: held_item1Size } = (ctx.Item)(buffer, offset + action_type1Size + hotbar_slot1Size)
            let { value: head_pos, size: head_posSize } = (ctx.vec3f)(buffer, offset + action_type1Size + hotbar_slot1Size + held_item1Size)
            return { value: { action_type: action_type1, hotbar_slot: hotbar_slot1, held_item: held_item1, head_pos }, size: action_type1Size + hotbar_slot1Size + held_item1Size + head_posSize}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + legacySize + transaction_typeSize + actionsSize)
      return { value: { legacy, transaction_type, actions, transaction_data }, size: legacySize + transaction_typeSize + actionsSize + transaction_dataSize}
    },
    ItemStacks: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = (ctx.Item)(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    RecipeIngredient: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"invalid","1":"int_id_meta","2":"molang","3":"item_tag","4":"string_id_meta","5":"complex_alias"}[value] || value, size }
      })(buffer, offset)
      let { value: network_id, size: network_idSize } = ((buffer, offset) => {
        switch (type) {
          case "int_id_meta": return (ctx.li16)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize)
      let { value: metadata, size: metadataSize } = ((buffer, offset) => {
        switch (type) {
          case "int_id_meta": return ((buffer, offset) => {
            switch (network_id) {
              case 0: return (ctx.void)(buffer, offset)
              default: return (ctx.li16)(buffer, offset)
            }
          })(buffer, offset)
          case "string_id_meta": return (ctx.li16)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + network_idSize)
      let { value: expression, size: expressionSize } = ((buffer, offset) => {
        switch (type) {
          case "molang": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + network_idSize + metadataSize)
      let { value: version, size: versionSize } = ((buffer, offset) => {
        switch (type) {
          case "molang": return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + network_idSize + metadataSize + expressionSize)
      let { value: tag, size: tagSize } = ((buffer, offset) => {
        switch (type) {
          case "item_tag": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + network_idSize + metadataSize + expressionSize + versionSize)
      let { value: name, size: nameSize } = ((buffer, offset) => {
        switch (type) {
          case "string_id_meta": return (ctx.string)(buffer, offset)
          case "complex_alias": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + network_idSize + metadataSize + expressionSize + versionSize + tagSize)
      let { value: count, size: countSize } = (ctx.zigzag32)(buffer, offset + typeSize + network_idSize + metadataSize + expressionSize + versionSize + tagSize + nameSize)
      return { value: { type, network_id, metadata, expression, version, tag, name, count }, size: typeSize + network_idSize + metadataSize + expressionSize + versionSize + tagSize + nameSize + countSize}
    },
    PotionTypeRecipes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: input_item_id, size: input_item_idSize } = (ctx.zigzag32)(buffer, offset)
        let { value: input_item_meta, size: input_item_metaSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize)
        let { value: ingredient_id, size: ingredient_idSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + input_item_metaSize)
        let { value: ingredient_meta, size: ingredient_metaSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + input_item_metaSize + ingredient_idSize)
        let { value: output_item_id, size: output_item_idSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + input_item_metaSize + ingredient_idSize + ingredient_metaSize)
        let { value: output_item_meta, size: output_item_metaSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + input_item_metaSize + ingredient_idSize + ingredient_metaSize + output_item_idSize)
        return { value: { input_item_id, input_item_meta, ingredient_id, ingredient_meta, output_item_id, output_item_meta }, size: input_item_idSize + input_item_metaSize + ingredient_idSize + ingredient_metaSize + output_item_idSize + output_item_metaSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    PotionContainerChangeRecipes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: input_item_id, size: input_item_idSize } = (ctx.zigzag32)(buffer, offset)
        let { value: ingredient_id, size: ingredient_idSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize)
        let { value: output_item_id, size: output_item_idSize } = (ctx.zigzag32)(buffer, offset + input_item_idSize + ingredient_idSize)
        return { value: { input_item_id, ingredient_id, output_item_id }, size: input_item_idSize + ingredient_idSize + output_item_idSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    Recipes: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: type1, size: type1Size } = ((buffer, offset) => {
          const { value, size } = (ctx.zigzag32)(buffer, offset)
          return { value: {"0":"shapeless","1":"shaped","2":"furnace","3":"furnace_with_metadata","4":"multi","5":"shulker_box","6":"shapeless_chemistry","7":"shaped_chemistry","8":"smithing_transform","9":"smithing_trim"}[value] || value, size }
        })(buffer, offset)
        let { value: recipe, size: recipeSize } = ((buffer, offset) => {
          switch (type1) {
            case "shapeless": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.ItemLegacy)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.varint)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "shulker_box": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.ItemLegacy)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.varint)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "shapeless_chemistry": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.ItemLegacy)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.varint)(buffer, offset + recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "shaped": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: width, size: widthSize } = (ctx.zigzag32)(buffer, offset + recipe_idSize)
              let { value: height, size: heightSize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const count = width
                const countSize = 0
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = ((buffer, offset) => {
                  const count = height
                  const countSize = 0
                  if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                  const data = []
                  let size = countSize
                  for (let i = 0; i < count; i++) {
                    const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                    data.push(elem.value)
                    size += elem.size
                  }
                  return { value: data, size }
                })(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + widthSize + heightSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.ItemLegacy)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.varint)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, width, height, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "shaped_chemistry": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: width, size: widthSize } = (ctx.zigzag32)(buffer, offset + recipe_idSize)
              let { value: height, size: heightSize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize)
              let { value: input, size: inputSize } = ((buffer, offset) => {
                const count = width
                const countSize = 0
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = ((buffer, offset) => {
                  const count = height
                  const countSize = 0
                  if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                  const data = []
                  let size = countSize
                  for (let i = 0; i < count; i++) {
                    const elem = (ctx.RecipeIngredient)(buffer, offset + size)
                    data.push(elem.value)
                    size += elem.size
                  }
                  return { value: data, size }
                })(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + widthSize + heightSize)
              let { value: output, size: outputSize } = ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.ItemLegacy)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize)
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize)
              let { value: priority, size: prioritySize } = (ctx.zigzag32)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize)
              let { value: network_id1, size: network_id1Size } = (ctx.varint)(buffer, offset + recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize + prioritySize)
              return { value: { recipe_id, width, height, input, output, uuid, block, priority, network_id: network_id1 }, size: recipe_idSize + widthSize + heightSize + inputSize + outputSize + uuidSize + blockSize + prioritySize + network_id1Size}
            })(buffer, offset)
            case "furnace": return ((buffer, offset) => {
              let { value: input_id, size: input_idSize } = (ctx.zigzag32)(buffer, offset)
              let { value: output, size: outputSize } = (ctx.ItemLegacy)(buffer, offset + input_idSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + input_idSize + outputSize)
              return { value: { input_id, output, block }, size: input_idSize + outputSize + blockSize}
            })(buffer, offset)
            case "furnace_with_metadata": return ((buffer, offset) => {
              let { value: input_id, size: input_idSize } = (ctx.zigzag32)(buffer, offset)
              let { value: input_meta, size: input_metaSize } = (ctx.zigzag32)(buffer, offset + input_idSize)
              let { value: output, size: outputSize } = (ctx.ItemLegacy)(buffer, offset + input_idSize + input_metaSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + input_idSize + input_metaSize + outputSize)
              return { value: { input_id, input_meta, output, block }, size: input_idSize + input_metaSize + outputSize + blockSize}
            })(buffer, offset)
            case "multi": return ((buffer, offset) => {
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
              let { value: network_id1, size: network_id1Size } = (ctx.varint)(buffer, offset + uuidSize)
              return { value: { uuid, network_id: network_id1 }, size: uuidSize + network_id1Size}
            })(buffer, offset)
            case "smithing_transform": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: template, size: templateSize } = (ctx.RecipeIngredient)(buffer, offset + recipe_idSize)
              let { value: base, size: baseSize } = (ctx.RecipeIngredient)(buffer, offset + recipe_idSize + templateSize)
              let { value: addition, size: additionSize } = (ctx.RecipeIngredient)(buffer, offset + recipe_idSize + templateSize + baseSize)
              let { value: result, size: resultSize } = (ctx.ItemLegacy)(buffer, offset + recipe_idSize + templateSize + baseSize + additionSize)
              let { value: tag1, size: tag1Size } = (ctx.string)(buffer, offset + recipe_idSize + templateSize + baseSize + additionSize + resultSize)
              let { value: network_id1, size: network_id1Size } = (ctx.varint)(buffer, offset + recipe_idSize + templateSize + baseSize + additionSize + resultSize + tag1Size)
              return { value: { recipe_id, template, base, addition, result, tag: tag1, network_id: network_id1 }, size: recipe_idSize + templateSize + baseSize + additionSize + resultSize + tag1Size + network_id1Size}
            })(buffer, offset)
            case "smithing_trim": return ((buffer, offset) => {
              let { value: recipe_id, size: recipe_idSize } = (ctx.string)(buffer, offset)
              let { value: template, size: templateSize } = (ctx.RecipeIngredient)(buffer, offset + recipe_idSize)
              let { value: input, size: inputSize } = (ctx.RecipeIngredient)(buffer, offset + recipe_idSize + templateSize)
              let { value: addition, size: additionSize } = (ctx.RecipeIngredient)(buffer, offset + recipe_idSize + templateSize + inputSize)
              let { value: block, size: blockSize } = (ctx.string)(buffer, offset + recipe_idSize + templateSize + inputSize + additionSize)
              let { value: network_id1, size: network_id1Size } = (ctx.varint)(buffer, offset + recipe_idSize + templateSize + inputSize + additionSize + blockSize)
              return { value: { recipe_id, template, input, addition, block, network_id: network_id1 }, size: recipe_idSize + templateSize + inputSize + additionSize + blockSize + network_id1Size}
            })(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + type1Size)
        return { value: { type: type1, recipe }, size: type1Size + recipeSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    SkinImage: (buffer, offset) => {
      let { value: width, size: widthSize } = (ctx.li32)(buffer, offset)
      let { value: height, size: heightSize } = (ctx.li32)(buffer, offset + widthSize)
      let { value: data, size: dataSize } = (ctx.ByteArray)(buffer, offset + widthSize + heightSize)
      return { value: { width, height, data }, size: widthSize + heightSize + dataSize}
    },
    Skin: (buffer, offset) => {
      let { value: skin_id, size: skin_idSize } = (ctx.string)(buffer, offset)
      let { value: play_fab_id, size: play_fab_idSize } = (ctx.string)(buffer, offset + skin_idSize)
      let { value: skin_resource_pack, size: skin_resource_packSize } = (ctx.string)(buffer, offset + skin_idSize + play_fab_idSize)
      let { value: skin_data, size: skin_dataSize } = (ctx.SkinImage)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize)
      let { value: animations, size: animationsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: skin_image, size: skin_imageSize } = (ctx.SkinImage)(buffer, offset)
          let { value: animation_type, size: animation_typeSize } = (ctx.li32)(buffer, offset + skin_imageSize)
          let { value: animation_frames, size: animation_framesSize } = (ctx.lf32)(buffer, offset + skin_imageSize + animation_typeSize)
          let { value: expression_type, size: expression_typeSize } = (ctx.lf32)(buffer, offset + skin_imageSize + animation_typeSize + animation_framesSize)
          return { value: { skin_image, animation_type, animation_frames, expression_type }, size: skin_imageSize + animation_typeSize + animation_framesSize + expression_typeSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize)
      let { value: cape_data, size: cape_dataSize } = (ctx.SkinImage)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize)
      let { value: geometry_data, size: geometry_dataSize } = (ctx.string)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize)
      let { value: geometry_data_version, size: geometry_data_versionSize } = (ctx.string)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize)
      let { value: animation_data, size: animation_dataSize } = (ctx.string)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize)
      let { value: cape_id, size: cape_idSize } = (ctx.string)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize)
      let { value: full_skin_id, size: full_skin_idSize } = (ctx.string)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize)
      let { value: arm_size, size: arm_sizeSize } = (ctx.string)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize)
      let { value: skin_color, size: skin_colorSize } = (ctx.string)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize + arm_sizeSize)
      let { value: personal_pieces, size: personal_piecesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: piece_id, size: piece_idSize } = (ctx.string)(buffer, offset)
          let { value: piece_type, size: piece_typeSize } = (ctx.string)(buffer, offset + piece_idSize)
          let { value: pack_id, size: pack_idSize } = (ctx.string)(buffer, offset + piece_idSize + piece_typeSize)
          let { value: is_default_piece, size: is_default_pieceSize } = (ctx.bool)(buffer, offset + piece_idSize + piece_typeSize + pack_idSize)
          let { value: product_id, size: product_idSize } = (ctx.string)(buffer, offset + piece_idSize + piece_typeSize + pack_idSize + is_default_pieceSize)
          return { value: { piece_id, piece_type, pack_id, is_default_piece, product_id }, size: piece_idSize + piece_typeSize + pack_idSize + is_default_pieceSize + product_idSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize)
      let { value: piece_tint_colors, size: piece_tint_colorsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: piece_type, size: piece_typeSize } = (ctx.string)(buffer, offset)
          let { value: colors, size: colorsSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + piece_typeSize)
          return { value: { piece_type, colors }, size: piece_typeSize + colorsSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize + personal_piecesSize)
      let { value: premium, size: premiumSize } = (ctx.bool)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize + personal_piecesSize + piece_tint_colorsSize)
      let { value: persona, size: personaSize } = (ctx.bool)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize + personal_piecesSize + piece_tint_colorsSize + premiumSize)
      let { value: cape_on_classic, size: cape_on_classicSize } = (ctx.bool)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize + personal_piecesSize + piece_tint_colorsSize + premiumSize + personaSize)
      let { value: primary_user, size: primary_userSize } = (ctx.bool)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize + personal_piecesSize + piece_tint_colorsSize + premiumSize + personaSize + cape_on_classicSize)
      let { value: overriding_player_appearance, size: overriding_player_appearanceSize } = (ctx.bool)(buffer, offset + skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize + personal_piecesSize + piece_tint_colorsSize + premiumSize + personaSize + cape_on_classicSize + primary_userSize)
      return { value: { skin_id, play_fab_id, skin_resource_pack, skin_data, animations, cape_data, geometry_data, geometry_data_version, animation_data, cape_id, full_skin_id, arm_size, skin_color, personal_pieces, piece_tint_colors, premium, persona, cape_on_classic, primary_user, overriding_player_appearance }, size: skin_idSize + play_fab_idSize + skin_resource_packSize + skin_dataSize + animationsSize + cape_dataSize + geometry_dataSize + geometry_data_versionSize + animation_dataSize + cape_idSize + full_skin_idSize + arm_sizeSize + skin_colorSize + personal_piecesSize + piece_tint_colorsSize + premiumSize + personaSize + cape_on_classicSize + primary_userSize + overriding_player_appearanceSize}
    },
    PlayerRecords: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"add","1":"remove"}[value] || value, size }
      })(buffer, offset)
      let { value: records_count, size: records_countSize } = (ctx.varint)(buffer, offset + typeSize)
      let { value: records, size: recordsSize } = ((buffer, offset) => {
        const count = records_count
        const countSize = 0
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          switch (type) {
            case "add": return ((buffer, offset) => {
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
              let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.zigzag64)(buffer, offset + uuidSize)
              let { value: username, size: usernameSize } = (ctx.string)(buffer, offset + uuidSize + entity_unique_idSize)
              let { value: xbox_user_id, size: xbox_user_idSize } = (ctx.string)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize)
              let { value: platform_chat_id, size: platform_chat_idSize } = (ctx.string)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize)
              let { value: build_platform, size: build_platformSize } = (ctx.li32)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize)
              let { value: skin_data1, size: skin_data1Size } = (ctx.Skin)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize + build_platformSize)
              let { value: is_teacher, size: is_teacherSize } = (ctx.bool)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize + build_platformSize + skin_data1Size)
              let { value: is_host, size: is_hostSize } = (ctx.bool)(buffer, offset + uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize + build_platformSize + skin_data1Size + is_teacherSize)
              return { value: { uuid, entity_unique_id, username, xbox_user_id, platform_chat_id, build_platform, skin_data: skin_data1, is_teacher, is_host }, size: uuidSize + entity_unique_idSize + usernameSize + xbox_user_idSize + platform_chat_idSize + build_platformSize + skin_data1Size + is_teacherSize + is_hostSize}
            })(buffer, offset)
            case "remove": return ((buffer, offset) => {
              let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
              return { value: { uuid }, size: uuidSize}
            })(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + typeSize + records_countSize)
      let { value: verified, size: verifiedSize } = ((buffer, offset) => {
        switch (type) {
          case "add": return ((buffer, offset) => {
            const count = records_count
            const countSize = 0
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.bool)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + records_countSize + recordsSize)
      return { value: { type, records_count, records, verified }, size: typeSize + records_countSize + recordsSize + verifiedSize}
    },
    Enchant: (buffer, offset) => {
      let { value: id, size: idSize } = (ctx.u8)(buffer, offset)
      let { value: level, size: levelSize } = (ctx.u8)(buffer, offset + idSize)
      return { value: { id, level }, size: idSize + levelSize}
    },
    EnchantOption: (buffer, offset) => {
      let { value: cost, size: costSize } = (ctx.varint)(buffer, offset)
      let { value: slot_flags, size: slot_flagsSize } = (ctx.li32)(buffer, offset + costSize)
      let { value: equip_enchants, size: equip_enchantsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.Enchant)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + costSize + slot_flagsSize)
      let { value: held_enchants, size: held_enchantsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.Enchant)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + costSize + slot_flagsSize + equip_enchantsSize)
      let { value: self_enchants, size: self_enchantsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.Enchant)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + costSize + slot_flagsSize + equip_enchantsSize + held_enchantsSize)
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset + costSize + slot_flagsSize + equip_enchantsSize + held_enchantsSize + self_enchantsSize)
      let { value: option_id, size: option_idSize } = (ctx.zigzag32)(buffer, offset + costSize + slot_flagsSize + equip_enchantsSize + held_enchantsSize + self_enchantsSize + nameSize)
      return { value: { cost, slot_flags, equip_enchants, held_enchants, self_enchants, name, option_id }, size: costSize + slot_flagsSize + equip_enchantsSize + held_enchantsSize + self_enchantsSize + nameSize + option_idSize}
    },
    Action: (buffer, offset) => {
      const { value, size } = (ctx.zigzag32)(buffer, offset)
      return { value: {"0":"start_break","1":"abort_break","2":"stop_break","3":"get_updated_block","4":"drop_item","5":"start_sleeping","6":"stop_sleeping","7":"respawn","8":"jump","9":"start_sprint","10":"stop_sprint","11":"start_sneak","12":"stop_sneak","13":"creative_player_destroy_block","14":"dimension_change_ack","15":"start_glide","16":"stop_glide","17":"build_denied","18":"crack_break","19":"change_skin","20":"set_enchatnment_seed","21":"swimming","22":"stop_swimming","23":"start_spin_attack","24":"stop_spin_attack","25":"interact_block","26":"predict_break","27":"continue_break","28":"start_item_use_on","29":"stop_item_use_on","30":"handled_teleport"}[value] || value, size }
    },
    StackRequestSlotInfo: (buffer, offset) => {
      let { value: slot_type, size: slot_typeSize } = (ctx.ContainerSlotType)(buffer, offset)
      let { value: slot, size: slotSize } = (ctx.u8)(buffer, offset + slot_typeSize)
      let { value: stack_id, size: stack_idSize } = (ctx.zigzag32)(buffer, offset + slot_typeSize + slotSize)
      return { value: { slot_type, slot, stack_id }, size: slot_typeSize + slotSize + stack_idSize}
    },
    ItemStackRequest: (buffer, offset) => {
      let { value: request_id, size: request_idSize } = (ctx.varint)(buffer, offset)
      let { value: actions, size: actionsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: type_id, size: type_idSize } = ((buffer, offset) => {
            const { value, size } = (ctx.u8)(buffer, offset)
            return { value: {"0":"take","1":"place","2":"swap","3":"drop","4":"destroy","5":"consume","6":"create","7":"place_in_container","8":"take_out_container","9":"lab_table_combine","10":"beacon_payment","11":"mine_block","12":"craft_recipe","13":"craft_recipe_auto","14":"craft_creative","15":"optional","16":"craft_grindstone_request","17":"craft_loom_request","18":"non_implemented","19":"results_deprecated"}[value] || value, size }
          })(buffer, offset)
          let { value: count1, size: count1Size } = ((buffer, offset) => {
            switch (type_id) {
              case "take": return (ctx.u8)(buffer, offset)
              case "place": return (ctx.u8)(buffer, offset)
              case "drop": return (ctx.u8)(buffer, offset)
              case "destroy": return (ctx.u8)(buffer, offset)
              case "consume": return (ctx.u8)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize)
          let { value: source, size: sourceSize } = ((buffer, offset) => {
            switch (type_id) {
              case "take": return (ctx.StackRequestSlotInfo)(buffer, offset)
              case "place": return (ctx.StackRequestSlotInfo)(buffer, offset)
              case "swap": return (ctx.StackRequestSlotInfo)(buffer, offset)
              case "drop": return (ctx.StackRequestSlotInfo)(buffer, offset)
              case "destroy": return (ctx.StackRequestSlotInfo)(buffer, offset)
              case "consume": return (ctx.StackRequestSlotInfo)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size)
          let { value: destination, size: destinationSize } = ((buffer, offset) => {
            switch (type_id) {
              case "take": return (ctx.StackRequestSlotInfo)(buffer, offset)
              case "place": return (ctx.StackRequestSlotInfo)(buffer, offset)
              case "swap": return (ctx.StackRequestSlotInfo)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize)
          let { value: randomly, size: randomlySize } = ((buffer, offset) => {
            switch (type_id) {
              case "drop": return (ctx.bool)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize)
          let { value: result_slot_id, size: result_slot_idSize } = ((buffer, offset) => {
            switch (type_id) {
              case "create": return (ctx.u8)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize)
          let { value: primary_effect, size: primary_effectSize } = ((buffer, offset) => {
            switch (type_id) {
              case "beacon_payment": return (ctx.zigzag32)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize)
          let { value: secondary_effect, size: secondary_effectSize } = ((buffer, offset) => {
            switch (type_id) {
              case "beacon_payment": return (ctx.zigzag32)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize)
          let { value: unknown1, size: unknown1Size } = ((buffer, offset) => {
            switch (type_id) {
              case "mine_block": return (ctx.zigzag32)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize)
          let { value: predicted_durability, size: predicted_durabilitySize } = ((buffer, offset) => {
            switch (type_id) {
              case "mine_block": return (ctx.zigzag32)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size)
          let { value: network_id1, size: network_id1Size } = ((buffer, offset) => {
            switch (type_id) {
              case "mine_block": return (ctx.zigzag32)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size + predicted_durabilitySize)
          let { value: recipe_network_id, size: recipe_network_idSize } = ((buffer, offset) => {
            switch (type_id) {
              case "craft_recipe": return (ctx.varint)(buffer, offset)
              case "craft_recipe_auto": return (ctx.varint)(buffer, offset)
              case "optional": return (ctx.varint)(buffer, offset)
              case "craft_grindstone_request": return (ctx.varint)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size + predicted_durabilitySize + network_id1Size)
          let { value: item_id, size: item_idSize } = ((buffer, offset) => {
            switch (type_id) {
              case "craft_creative": return (ctx.varint)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size + predicted_durabilitySize + network_id1Size + recipe_network_idSize)
          let { value: filtered_string_index, size: filtered_string_indexSize } = ((buffer, offset) => {
            switch (type_id) {
              case "optional": return (ctx.li32)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size + predicted_durabilitySize + network_id1Size + recipe_network_idSize + item_idSize)
          let { value: cost1, size: cost1Size } = ((buffer, offset) => {
            switch (type_id) {
              case "craft_grindstone_request": return (ctx.varint)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size + predicted_durabilitySize + network_id1Size + recipe_network_idSize + item_idSize + filtered_string_indexSize)
          let { value: pattern, size: patternSize } = ((buffer, offset) => {
            switch (type_id) {
              case "craft_loom_request": return (ctx.string)(buffer, offset)
              case "non_implemented": return (ctx.void)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size + predicted_durabilitySize + network_id1Size + recipe_network_idSize + item_idSize + filtered_string_indexSize + cost1Size)
          let { value: result_items, size: result_itemsSize } = ((buffer, offset) => {
            switch (type_id) {
              case "non_implemented": return (ctx.void)(buffer, offset)
              case "results_deprecated": return ((buffer, offset) => {
                const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                const data = []
                let size = countSize
                for (let i = 0; i < count; i++) {
                  const elem = (ctx.ItemLegacy)(buffer, offset + size)
                  data.push(elem.value)
                  size += elem.size
                }
                return { value: data, size }
              })(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size + predicted_durabilitySize + network_id1Size + recipe_network_idSize + item_idSize + filtered_string_indexSize + cost1Size + patternSize)
          let { value: times_crafted, size: times_craftedSize } = ((buffer, offset) => {
            switch (type_id) {
              case "non_implemented": return (ctx.void)(buffer, offset)
              case "results_deprecated": return (ctx.u8)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size + predicted_durabilitySize + network_id1Size + recipe_network_idSize + item_idSize + filtered_string_indexSize + cost1Size + patternSize + result_itemsSize)
          return { value: { type_id, count: count1, source, destination, randomly, result_slot_id, primary_effect, secondary_effect, unknown1, predicted_durability, network_id: network_id1, recipe_network_id, item_id, filtered_string_index, cost: cost1, pattern, result_items, times_crafted }, size: type_idSize + count1Size + sourceSize + destinationSize + randomlySize + result_slot_idSize + primary_effectSize + secondary_effectSize + unknown1Size + predicted_durabilitySize + network_id1Size + recipe_network_idSize + item_idSize + filtered_string_indexSize + cost1Size + patternSize + result_itemsSize + times_craftedSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + request_idSize)
      let { value: custom_names, size: custom_namesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + request_idSize + actionsSize)
      let { value: cause, size: causeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.li32)(buffer, offset)
        return { value: {"0":"chat_public","1":"chat_whisper","2":"sign_text","3":"anvil_text","4":"book_and_quill_text","5":"command_block_text","6":"block_actor_data_text","7":"join_event_text","8":"leave_event_text","9":"slash_command_chat","10":"cartography_text","11":"kick_command","12":"title_command","13":"summon_command"}[value] || value, size }
      })(buffer, offset + request_idSize + actionsSize + custom_namesSize)
      return { value: { request_id, actions, custom_names, cause }, size: request_idSize + actionsSize + custom_namesSize + causeSize}
    },
    ItemStackResponses: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: status, size: statusSize } = ((buffer, offset) => {
          const { value, size } = (ctx.u8)(buffer, offset)
          return { value: {"0":"ok","1":"error"}[value] || value, size }
        })(buffer, offset)
        let { value: request_id1, size: request_id1Size } = (ctx.varint)(buffer, offset + statusSize)
        let { value: containers, size: containersSize } = ((buffer, offset) => {
          switch (status) {
            case "ok": return ((buffer, offset) => {
              const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
              if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
              const data = []
              let size = countSize
              for (let i = 0; i < count; i++) {
                const elem = ((buffer, offset) => {
                let { value: slot_type1, size: slot_type1Size } = (ctx.ContainerSlotType)(buffer, offset)
                let { value: slots, size: slotsSize } = ((buffer, offset) => {
                  const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
                  if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
                  const data = []
                  let size = countSize
                  for (let i = 0; i < count; i++) {
                    const elem = ((buffer, offset) => {
                    let { value: slot1, size: slot1Size } = (ctx.u8)(buffer, offset)
                    let { value: hotbar_slot1, size: hotbar_slot1Size } = (ctx.u8)(buffer, offset + slot1Size)
                    let { value: count1, size: count1Size } = (ctx.u8)(buffer, offset + slot1Size + hotbar_slot1Size)
                    let { value: item_stack_id, size: item_stack_idSize } = (ctx.varint)(buffer, offset + slot1Size + hotbar_slot1Size + count1Size)
                    let { value: custom_name, size: custom_nameSize } = (ctx.string)(buffer, offset + slot1Size + hotbar_slot1Size + count1Size + item_stack_idSize)
                    let { value: durability_correction, size: durability_correctionSize } = (ctx.zigzag32)(buffer, offset + slot1Size + hotbar_slot1Size + count1Size + item_stack_idSize + custom_nameSize)
                    return { value: { slot: slot1, hotbar_slot: hotbar_slot1, count: count1, item_stack_id, custom_name, durability_correction }, size: slot1Size + hotbar_slot1Size + count1Size + item_stack_idSize + custom_nameSize + durability_correctionSize}
                  })(buffer, offset + size)
                    data.push(elem.value)
                    size += elem.size
                  }
                  return { value: data, size }
                })(buffer, offset + slot_type1Size)
                return { value: { slot_type: slot_type1, slots }, size: slot_type1Size + slotsSize}
              })(buffer, offset + size)
                data.push(elem.value)
                size += elem.size
              }
              return { value: data, size }
            })(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + statusSize + request_id1Size)
        return { value: { status, request_id: request_id1, containers }, size: statusSize + request_id1Size + containersSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    ItemComponentList: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
        let { value: nbt1, size: nbt1Size } = (ctx.nbt)(buffer, offset + name1Size)
        return { value: { name: name1, nbt: nbt1 }, size: name1Size + nbt1Size}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    CommandOrigin: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"player","1":"block","2":"minecart_block","3":"dev_console","4":"test","5":"automation_player","6":"client_automation","7":"dedicated_server","8":"entity","9":"virtual","10":"game_argument","11":"entity_server","12":"precompiled","13":"game_director_entity_server","14":"script","15":"executor"}[value] || value, size }
      })(buffer, offset)
      let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset + typeSize)
      let { value: request_id, size: request_idSize } = (ctx.string)(buffer, offset + typeSize + uuidSize)
      let { value: player_entity_id, size: player_entity_idSize } = ((buffer, offset) => {
        switch (type) {
          case "dev_console": return ((buffer, offset) => {
            let { value: player_entity_id1, size: player_entity_id1Size } = (ctx.zigzag64)(buffer, offset)
            return { value: { player_entity_id: player_entity_id1 }, size: player_entity_id1Size}
          })(buffer, offset)
          case "test": return ((buffer, offset) => {
            let { value: player_entity_id1, size: player_entity_id1Size } = (ctx.zigzag64)(buffer, offset)
            return { value: { player_entity_id: player_entity_id1 }, size: player_entity_id1Size}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + uuidSize + request_idSize)
      return { value: { type, uuid, request_id, player_entity_id }, size: typeSize + uuidSize + request_idSize + player_entity_idSize}
    },
    TrackedObject: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.li32)(buffer, offset)
        return { value: {"0":"entity","1":"block"}[value] || value, size }
      })(buffer, offset)
      let { value: entity_unique_id, size: entity_unique_idSize } = ((buffer, offset) => {
        switch (type) {
          case "entity": return (ctx.zigzag64)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize)
      let { value: block_position, size: block_positionSize } = ((buffer, offset) => {
        switch (type) {
          case "block": return (ctx.BlockCoordinates)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + entity_unique_idSize)
      return { value: { type, entity_unique_id, block_position }, size: typeSize + entity_unique_idSize + block_positionSize}
    },
    MapDecoration: (buffer, offset) => {
      let { value: type, size: typeSize } = (ctx.u8)(buffer, offset)
      let { value: rotation, size: rotationSize } = (ctx.u8)(buffer, offset + typeSize)
      let { value: x, size: xSize } = (ctx.u8)(buffer, offset + typeSize + rotationSize)
      let { value: y, size: ySize } = (ctx.u8)(buffer, offset + typeSize + rotationSize + xSize)
      let { value: label, size: labelSize } = (ctx.string)(buffer, offset + typeSize + rotationSize + xSize + ySize)
      let { value: color_abgr, size: color_abgrSize } = (ctx.varint)(buffer, offset + typeSize + rotationSize + xSize + ySize + labelSize)
      return { value: { type, rotation, x, y, label, color_abgr }, size: typeSize + rotationSize + xSize + ySize + labelSize + color_abgrSize}
    },
    StructureBlockSettings: (buffer, offset) => {
      let { value: palette_name, size: palette_nameSize } = (ctx.string)(buffer, offset)
      let { value: ignore_entities, size: ignore_entitiesSize } = (ctx.bool)(buffer, offset + palette_nameSize)
      let { value: ignore_blocks, size: ignore_blocksSize } = (ctx.bool)(buffer, offset + palette_nameSize + ignore_entitiesSize)
      let { value: non_ticking_players_and_ticking_areas, size: non_ticking_players_and_ticking_areasSize } = (ctx.bool)(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize)
      let { value: size1, size: size1Size } = (ctx.BlockCoordinates)(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize)
      let { value: structure_offset, size: structure_offsetSize } = (ctx.BlockCoordinates)(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size)
      let { value: last_editing_player_unique_id, size: last_editing_player_unique_idSize } = (ctx.zigzag64)(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size + structure_offsetSize)
      let { value: rotation, size: rotationSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"none","1":"90_deg","2":"180_deg","3":"270_deg"}[value] || value, size }
      })(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size + structure_offsetSize + last_editing_player_unique_idSize)
      let { value: mirror, size: mirrorSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"none","1":"x_axis","2":"z_axis","3":"both_axes"}[value] || value, size }
      })(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size + structure_offsetSize + last_editing_player_unique_idSize + rotationSize)
      let { value: animation_mode, size: animation_modeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"none","1":"layers","2":"blocks"}[value] || value, size }
      })(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size + structure_offsetSize + last_editing_player_unique_idSize + rotationSize + mirrorSize)
      let { value: animation_duration, size: animation_durationSize } = (ctx.lf32)(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size + structure_offsetSize + last_editing_player_unique_idSize + rotationSize + mirrorSize + animation_modeSize)
      let { value: integrity, size: integritySize } = (ctx.lf32)(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size + structure_offsetSize + last_editing_player_unique_idSize + rotationSize + mirrorSize + animation_modeSize + animation_durationSize)
      let { value: seed, size: seedSize } = (ctx.lu32)(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size + structure_offsetSize + last_editing_player_unique_idSize + rotationSize + mirrorSize + animation_modeSize + animation_durationSize + integritySize)
      let { value: pivot, size: pivotSize } = (ctx.vec3f)(buffer, offset + palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size + structure_offsetSize + last_editing_player_unique_idSize + rotationSize + mirrorSize + animation_modeSize + animation_durationSize + integritySize + seedSize)
      return { value: { palette_name, ignore_entities, ignore_blocks, non_ticking_players_and_ticking_areas, size: size1, structure_offset, last_editing_player_unique_id, rotation, mirror, animation_mode, animation_duration, integrity, seed, pivot }, size: palette_nameSize + ignore_entitiesSize + ignore_blocksSize + non_ticking_players_and_ticking_areasSize + size1Size + structure_offsetSize + last_editing_player_unique_idSize + rotationSize + mirrorSize + animation_modeSize + animation_durationSize + integritySize + seedSize + pivotSize}
    },
    EducationSharedResourceURI: (buffer, offset) => {
      let { value: button_name, size: button_nameSize } = (ctx.string)(buffer, offset)
      let { value: link_uri, size: link_uriSize } = (ctx.string)(buffer, offset + button_nameSize)
      return { value: { button_name, link_uri }, size: button_nameSize + link_uriSize}
    },
    EducationExternalLinkSettings: (buffer, offset) => {
      let { value: url, size: urlSize } = (ctx.string)(buffer, offset)
      let { value: display_name, size: display_nameSize } = (ctx.string)(buffer, offset + urlSize)
      return { value: { url, display_name }, size: urlSize + display_nameSize}
    },
    BlockUpdate: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: runtime_id, size: runtime_idSize } = (ctx.varint)(buffer, offset + positionSize)
      let { value: flags, size: flagsSize } = (ctx.varint)(buffer, offset + positionSize + runtime_idSize)
      let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.zigzag64)(buffer, offset + positionSize + runtime_idSize + flagsSize)
      let { value: transition_type, size: transition_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"entity","1":"create","2":"destroy"}[value] || value, size }
      })(buffer, offset + positionSize + runtime_idSize + flagsSize + entity_unique_idSize)
      return { value: { position, runtime_id, flags, entity_unique_id, transition_type }, size: positionSize + runtime_idSize + flagsSize + entity_unique_idSize + transition_typeSize}
    },
    MaterialReducer: (buffer, offset) => {
      let { value: mix, size: mixSize } = (ctx.zigzag32)(buffer, offset)
      let { value: items, size: itemsSize } = ((buffer, offset) => {
        let { value: network_id1, size: network_id1Size } = (ctx.zigzag32)(buffer, offset)
        let { value: count1, size: count1Size } = (ctx.zigzag32)(buffer, offset + network_id1Size)
        return { value: { network_id: network_id1, count: count1 }, size: network_id1Size + count1Size}
      })(buffer, offset + mixSize)
      return { value: { mix, items }, size: mixSize + itemsSize}
    },
    PermissionLevel: (buffer, offset) => {
      const { value, size } = (ctx.u8)(buffer, offset)
      return { value: {"0":"visitor","1":"member","2":"operator","3":"custom"}[value] || value, size }
    },
    CommandPermissionLevel: (buffer, offset) => {
      const { value, size } = (ctx.u8)(buffer, offset)
      return { value: {"0":"normal","1":"operator","2":"automation","3":"host","4":"owner","5":"internal"}[value] || value, size }
    },
    CommandPermissionLevelVarint: (buffer, offset) => {
      const { value, size } = (ctx.u8)(buffer, offset)
      return { value: {"0":"normal","1":"operator","2":"automation","3":"host","4":"owner","5":"internal"}[value] || value, size }
    },
    WindowID: (buffer, offset) => {
      const { value, size } = (ctx.i8)(buffer, offset)
      return { value: {"0":"inventory","1":"first","100":"last","119":"offhand","120":"armor","121":"creative","122":"hotbar","123":"fixed_inventory","124":"ui","-100":"drop_contents","-24":"beacon","-23":"trading_output","-22":"trading_use_inputs","-21":"trading_input_2","-20":"trading_input_1","-17":"enchant_output","-16":"enchant_material","-15":"enchant_input","-13":"anvil_output","-12":"anvil_result","-11":"anvil_material","-10":"container_input","-5":"crafting_use_ingredient","-4":"crafting_result","-3":"crafting_remove_ingredient","-2":"crafting_add_ingredient","-1":"none"}[value] || value, size }
    },
    WindowIDVarint: (buffer, offset) => {
      const { value, size } = (ctx.varint)(buffer, offset)
      return { value: {"0":"inventory","1":"first","100":"last","119":"offhand","120":"armor","121":"creative","122":"hotbar","123":"fixed_inventory","124":"ui","-100":"drop_contents","-24":"beacon","-23":"trading_output","-22":"trading_use_inputs","-21":"trading_input_2","-20":"trading_input_1","-17":"enchant_output","-16":"enchant_material","-15":"enchant_input","-13":"anvil_output","-12":"anvil_result","-11":"anvil_material","-10":"container_input","-5":"crafting_use_ingredient","-4":"crafting_result","-3":"crafting_remove_ingredient","-2":"crafting_add_ingredient","-1":"none"}[value] || value, size }
    },
    WindowType: (buffer, offset) => {
      const { value, size } = (ctx.i8)(buffer, offset)
      return { value: {"0":"container","1":"workbench","2":"furnace","3":"enchantment","4":"brewing_stand","5":"anvil","6":"dispenser","7":"dropper","8":"hopper","9":"cauldron","10":"minecart_chest","11":"minecart_hopper","12":"horse","13":"beacon","14":"structure_editor","15":"trading","16":"command_block","17":"jukebox","18":"armor","19":"hand","20":"compound_creator","21":"element_constructor","22":"material_reducer","23":"lab_table","24":"loom","25":"lectern","26":"grindstone","27":"blast_furnace","28":"smoker","29":"stonecutter","30":"cartography","31":"hud","32":"jigsaw_editor","33":"smithing_table","34":"chest_boat","-9":"none","-1":"inventory"}[value] || value, size }
    },
    ContainerSlotType: (buffer, offset) => {
      const { value, size } = (ctx.u8)(buffer, offset)
      return { value: {"0":"anvil_input","1":"anvil_material","2":"anvil_result","3":"smithing_table_input","4":"smithing_table_material","5":"smithing_table_result","6":"armor","7":"container","8":"beacon_payment","9":"brewing_input","10":"brewing_result","11":"brewing_fuel","12":"hotbar_and_inventory","13":"crafting_input","14":"crafting_output","15":"recipe_construction","16":"recipe_nature","17":"recipe_items","18":"recipe_search","19":"recipe_search_bar","20":"recipe_equipment","21":"recipe_book","22":"enchanting_input","23":"enchanting_lapis","24":"furnace_fuel","25":"furnace_ingredient","26":"furnace_output","27":"horse_equip","28":"hotbar","29":"inventory","30":"shulker","31":"trade_ingredient1","32":"trade_ingredient2","33":"trade_result","34":"offhand","35":"compcreate_input","36":"compcreate_output","37":"elemconstruct_output","38":"matreduce_input","39":"matreduce_output","40":"labtable_input","41":"loom_input","42":"loom_dye","43":"loom_material","44":"loom_result","45":"blast_furnace_ingredient","46":"smoker_ingredient","47":"trade2_ingredient1","48":"trade2_ingredient2","49":"trade2_result","50":"grindstone_input","51":"grindstone_additional","52":"grindstone_result","53":"stonecutter_input","54":"stonecutter_result","55":"cartography_input","56":"cartography_additional","57":"cartography_result","58":"barrel","59":"cursor","60":"creative_output","61":"smithing_table_template"}[value] || value, size }
    },
    SoundType: (buffer, offset) => {
      const { value, size } = (ctx.varint)(buffer, offset)
      return { value: {"0":"ItemUseOn","1":"Hit","2":"Step","3":"Fly","4":"Jump","5":"Break","6":"Place","7":"HeavyStep","8":"Gallop","9":"Fall","10":"Ambient","11":"AmbientBaby","12":"AmbientInWater","13":"Breathe","14":"Death","15":"DeathInWater","16":"DeathToZombie","17":"Hurt","18":"HurtInWater","19":"Mad","20":"Boost","21":"Bow","22":"SquishBig","23":"SquishSmall","24":"FallBig","25":"FallSmall","26":"Splash","27":"Fizz","28":"Flap","29":"Swim","30":"Drink","31":"Eat","32":"Takeoff","33":"Shake","34":"Plop","35":"Land","36":"Saddle","37":"Armor","38":"MobArmorStandPlace","39":"AddChest","40":"Throw","41":"Attack","42":"AttackNoDamage","43":"AttackStrong","44":"Warn","45":"Shear","46":"Milk","47":"Thunder","48":"Explode","49":"Fire","50":"Ignite","51":"Fuse","52":"Stare","53":"Spawn","54":"Shoot","55":"BreakBlock","56":"Launch","57":"Blast","58":"LargeBlast","59":"Twinkle","60":"Remedy","61":"Infect","62":"LevelUp","63":"BowHit","64":"BulletHit","65":"ExtinguishFire","66":"ItemFizz","67":"ChestOpen","68":"ChestClosed","69":"ShulkerBoxOpen","70":"ShulkerBoxClosed","71":"EnderChestOpen","72":"EnderChestClosed","73":"PowerOn","74":"PowerOff","75":"Attach","76":"Detach","77":"Deny","78":"Tripod","79":"Pop","80":"DropSlot","81":"Note","82":"Thorns","83":"PistonIn","84":"PistonOut","85":"Portal","86":"Water","87":"LavaPop","88":"Lava","89":"Burp","90":"BucketFillWater","91":"BucketFillLava","92":"BucketEmptyWater","93":"BucketEmptyLava","94":"ArmorEquipChain","95":"ArmorEquipDiamond","96":"ArmorEquipGeneric","97":"ArmorEquipGold","98":"ArmorEquipIron","99":"ArmorEquipLeather","100":"ArmorEquipElytra","101":"Record13","102":"RecordCat","103":"RecordBlocks","104":"RecordChirp","105":"RecordFar","106":"RecordMall","107":"RecordMellohi","108":"RecordStal","109":"RecordStrad","110":"RecordWard","111":"Record11","112":"RecordWait","113":"StopRecord","114":"Flop","115":"GuardianCurse","116":"MobWarning","117":"MobWarningBaby","118":"Teleport","119":"ShulkerOpen","120":"ShulkerClose","121":"Haggle","122":"HaggleYes","123":"HaggleNo","124":"HaggleIdle","125":"ChorusGrow","126":"ChorusDeath","127":"Glass","128":"PotionBrewed","129":"CastSpell","130":"PrepareAttackSpell","131":"PrepareSummon","132":"PrepareWololo","133":"Fang","134":"Charge","135":"CameraTakePicture","136":"LeashKnotPlace","137":"LeashKnotBreak","138":"AmbientGrowl","139":"AmbientWhine","140":"AmbientPant","141":"AmbientPurr","142":"AmbientPurreow","143":"DeathMinVolume","144":"DeathMidVolume","145":"ImitateBlaze","146":"ImitateCaveSpider","147":"ImitateCreeper","148":"ImitateElderGuardian","149":"ImitateEnderDragon","150":"ImitateEnderman","151":"ImitateEndermite","152":"ImitateEvocationIllager","153":"ImitateGhast","154":"ImitateHusk","155":"ImitateIllusionIllager","156":"ImitateMagmaCube","157":"ImitatePolarBear","158":"ImitateShulker","159":"ImitateSilverfish","160":"ImitateSkeleton","161":"ImitateSlime","162":"ImitateSpider","163":"ImitateStray","164":"ImitateVex","165":"ImitateVindicationIllager","166":"ImitateWitch","167":"ImitateWither","168":"ImitateWitherSkeleton","169":"ImitateWolf","170":"ImitateZombie","171":"ImitateZombiePigman","172":"ImitateZombieVillager","173":"EnderEyePlaced","174":"EndPortalCreated","175":"AnvilUse","176":"BottleDragonBreath","177":"PortalTravel","178":"TridentHit","179":"TridentReturn","180":"TridentRiptide1","181":"TridentRiptide2","182":"TridentRiptide3","183":"TridentThrow","184":"TridentThunder","185":"TridentHitGround","186":"Default","187":"FletchingTableUse","188":"ElemConstructOpen","189":"IceBombHit","190":"BalloonPop","191":"LtReactionIceBomb","192":"LtReactionBleach","193":"LtReactionElephantToothpaste","194":"LtReactionElephantToothpaste2","195":"LtReactionGlowStick","196":"LtReactionGlowStick2","197":"LtReactionLuminol","198":"LtReactionSalt","199":"LtReactionFertilizer","200":"LtReactionFireball","201":"LtReactionMagnesiumSalt","202":"LtReactionMiscFire","203":"LtReactionFire","204":"LtReactionMiscExplosion","205":"LtReactionMiscMystical","206":"LtReactionMiscMystical2","207":"LtReactionProduct","208":"SparklerUse","209":"GlowStickUse","210":"SparklerActive","211":"ConvertToDrowned","212":"BucketFillFish","213":"BucketEmptyFish","214":"BubbleColumnUpwards","215":"BubbleColumnDownwards","216":"BubblePop","217":"BubbleUpInside","218":"BubbleDownInside","219":"HurtBaby","220":"DeathBaby","221":"StepBaby","222":"SpawnBaby","223":"Born","224":"TurtleEggBreak","225":"TurtleEggCrack","226":"TurtleEggHatched","227":"LayEgg","228":"TurtleEggAttacked","229":"BeaconActivate","230":"BeaconAmbient","231":"BeaconDeactivate","232":"BeaconPower","233":"ConduitActivate","234":"ConduitAmbient","235":"ConduitAttack","236":"ConduitDeactivate","237":"ConduitShort","238":"Swoop","239":"BambooSaplingPlace","240":"PreSneeze","241":"Sneeze","242":"AmbientTame","243":"Scared","244":"ScaffoldingClimb","245":"CrossbowLoadingStart","246":"CrossbowLoadingMiddle","247":"CrossbowLoadingEnd","248":"CrossbowShoot","249":"CrossbowQuickChargeStart","250":"CrossbowQuickChargeMiddle","251":"CrossbowQuickChargeEnd","252":"AmbientAggressive","253":"AmbientWorried","254":"CantBreed","255":"ShieldBlock","256":"LecternBookPlace","257":"GrindstoneUse","258":"Bell","259":"CampfireCrackle","260":"Roar","261":"Stun","262":"SweetBerryBushHurt","263":"SweetBerryBushPick","264":"CartographyTableUse","265":"StonecutterUse","266":"ComposterEmpty","267":"ComposterFill","268":"ComposterFillLayer","269":"ComposterReady","270":"BarrelOpen","271":"BarrelClose","272":"RaidHorn","273":"LoomUse","274":"AmbientInRaid","275":"UicartographyTableUse","276":"UistonecutterUse","277":"UiloomUse","278":"SmokerUse","279":"BlastFurnaceUse","280":"SmithingTableUse","281":"Screech","282":"Sleep","283":"FurnaceUse","284":"MooshroomConvert","285":"MilkSuspiciously","286":"Celebrate","287":"JumpPrevent","288":"AmbientPollinate","289":"BeehiveDrip","290":"BeehiveEnter","291":"BeehiveExit","292":"BeehiveWork","293":"BeehiveShear","294":"HoneybottleDrink","295":"AmbientCave","296":"Retreat","297":"ConvertToZombified","298":"Admire","299":"StepLava","300":"Tempt","301":"Panic","302":"Angry","303":"AmbientMoodWarpedForest","304":"AmbientMoodSoulsandValley","305":"AmbientMoodNetherWastes","306":"AmbientMoodBasaltDeltas","307":"AmbientMoodCrimsonForest","308":"RespawnAnchorCharge","309":"RespawnAnchorDeplete","310":"RespawnAnchorSetSpawn","311":"RespawnAnchorAmbient","312":"SoulEscapeQuiet","313":"SoulEscapeLoud","314":"RecordPigstep","315":"LinkCompassToLodestone","316":"UseSmithingTable","317":"EquipNetherite","318":"AmbientLoopWarpedForest","319":"AmbientLoopSoulsandValley","320":"AmbientLoopNetherWastes","321":"AmbientLoopBasaltDeltas","322":"AmbientLoopCrimsonForest","323":"AmbientAdditionWarpedForest","324":"AmbientAdditionSoulsandValley","325":"AmbientAdditionNetherWastes","326":"AmbientAdditionBasaltDeltas","327":"AmbientAdditionCrimsonForest","328":"SculkSensorPowerOn","329":"SculkSensorPowerOff","330":"BucketFillPowderSnow","331":"BucketEmptyPowderSnow","332":"PointedDripstoneCauldronDripWater","333":"PointedDripstoneCauldronDripLava","334":"PointedDripstoneDripWater","335":"PointedDripstoneDripLava","336":"CaveVinesPickBerries","337":"BigDripleafTiltDown","338":"BigDripleafTiltUp","339":"CopperWaxOn","340":"CopperWaxOff","341":"Scrape","342":"PlayerHurtDrown","343":"PlayerHurtOnFire","344":"PlayerHurtFreeze","345":"UseSpyglass","346":"StopUsingSpyglass","347":"AmethystBlockChime","348":"AmbientScreamer","349":"HurtScreamer","350":"DeathScreamer","351":"MilkScreamer","352":"JumpToBlock","353":"PreRam","354":"PreRamScreamer","355":"RamImpact","356":"RamImpactScreamer","357":"SquidInkSquirt","358":"GlowSquidInkSquirt","359":"ConvertToStray","360":"CakeAddCandle","361":"ExtinguishCandle","362":"AmbientCandle","363":"BlockClick","364":"BlockClickFail","365":"SculkCatalystBloom","366":"SculkShriekerShriek","367":"WardenNearbyClose","368":"WardenNearbyCloser","369":"WardenNearbyClosest","370":"WardenSlightlyAngry","371":"RecordOtherside","372":"Tongue","373":"CrackIronGolem","374":"RepairIronGolem","375":"Listening","376":"Heartbeat","377":"HornBreak","378":"SculkPlace","379":"SculkSpread","380":"SculkCharge","381":"SculkSensorPlace","382":"SculkShriekerPlace","383":"goat_call_0","384":"goat_call_1","385":"goat_call_2","386":"goat_call_3","387":"goat_call_4","388":"goat_call_5","389":"goat_call_6","390":"goat_call_7","391":"goat_call_8","392":"goat_call_9","393":"goat_harmony_0","394":"goat_harmony_1","395":"goat_harmony_2","396":"goat_harmony_3","397":"goat_harmony_4","398":"goat_harmony_5","399":"goat_harmony_6","400":"goat_harmony_7","401":"goat_harmony_8","402":"goat_harmony_9","403":"goat_melody_0","404":"goat_melody_1","405":"goat_melody_2","406":"goat_melody_3","407":"goat_melody_4","408":"goat_melody_5","409":"goat_melody_6","410":"goat_melody_7","411":"goat_melody_8","412":"goat_melody_9","413":"goat_bass_0","414":"goat_bass_1","415":"goat_bass_2","416":"goat_bass_3","417":"goat_bass_4","418":"goat_bass_5","419":"goat_bass_6","420":"goat_bass_7","421":"goat_bass_8","422":"goat_bass_9","423":"_","424":"_","425":"_","426":"ImitateWarden","427":"ListeningAngry","428":"ItemGiven","429":"ItemTaken","430":"Disappeared","431":"Reappeared","432":"DrinkMilk","433":"FrogspawnHatched","434":"LaySpawn","435":"FrogspawnBreak","436":"SonicBoom","437":"SonicCharge","438":"SoundeventItemThrown","439":"Record5","440":"ConvertToFrog","441":"RecordPlaying","442":"DrinkMilk","443":"RecordPlaying","444":"EnchantingTableUse","445":"StepSand","446":"DashReady","447":"BundleDropContents","448":"BundleInsert","449":"BundleRemoveOne","450":"PressurePlateClickOff","451":"PressurePlateClickOn","452":"ButtonClickOff","453":"ButtonClickOn","454":"DoorOpen","455":"DoorClose","456":"TrapdoorOpen","457":"TrapdoorClose","458":"FenceGateOpen","459":"FenceGateClose","460":"Insert","461":"Pickup","462":"InsertEnchanted","463":"PickupEnchanted","464":"Brush","465":"BrushCompleted","466":"ShatterDecoratedPot","467":"BreakDecoratedPot","468":"SnifferEggCrack","469":"SnifferEggHatched","470":"WaxedSignInteractFail","471":"RecordRelic"}[value] || value, size }
    },
    LegacyEntityType: (buffer, offset) => {
      const { value, size } = (ctx.li32)(buffer, offset)
      return { value: {"10":"chicken","11":"cow","12":"pig","13":"sheep","14":"wolf","15":"villager","16":"mooshroom","17":"squid","18":"rabbit","19":"bat","20":"iron_golem","21":"snow_golem","22":"ocelot","23":"horse","24":"donkey","25":"mule","26":"skeleton_horse","27":"zombie_horse","28":"polar_bear","29":"llama","30":"parrot","31":"dolphin","32":"zombie","33":"creeper","34":"skeleton","35":"spider","36":"zombie_pigman","37":"slime","38":"enderman","39":"silverfish","40":"cave_spider","41":"ghast","42":"magma_cube","43":"blaze","44":"zombie_villager","45":"witch","46":"stray","47":"husk","48":"wither_skeleton","49":"guardian","50":"elder_guardian","51":"npc","52":"wither","53":"ender_dragon","54":"shulker","55":"endermite","56":"agent","57":"vindicator","58":"phantom","61":"armor_stand","62":"tripod_camera","63":"player","64":"item","65":"tnt","66":"falling_block","67":"moving_block","68":"xp_bottle","69":"xp_orb","70":"eye_of_ender_signal","71":"ender_crystal","72":"fireworks_rocket","73":"thrown_trident","74":"turtle","75":"cat","76":"shulker_bullet","77":"fishing_hook","78":"chalkboard","79":"dragon_fireball","80":"arrow","81":"snowball","82":"egg","83":"painting","84":"minecart","85":"fireball","86":"splash_potion","87":"ender_pearl","88":"leash_knot","89":"wither_skull","90":"boat","91":"wither_skull_dangerous","93":"lightning_bolt","94":"small_fireball","95":"area_effect_cloud","96":"hopper_minecart","97":"tnt_minecart","98":"chest_minecart","100":"command_block_minecart","101":"lingering_potion","102":"llama_spit","103":"evocation_fang","104":"evocation_illager","105":"vex","106":"ice_bomb","107":"balloon","108":"pufferfish","109":"salmon","110":"drowned","111":"tropicalfish","112":"cod","113":"panda"}[value] || value, size }
    },
    DeviceOS: (buffer, offset) => {
      const { value, size } = (ctx.li32)(buffer, offset)
      return { value: {"0":"Undefined","1":"Android","2":"IOS","3":"OSX","4":"FireOS","5":"GearVR","6":"Hololens","7":"Win10","8":"Win32","9":"Dedicated","10":"TVOS","11":"Orbis","12":"NintendoSwitch","13":"Xbox","14":"WindowsPhone","15":"Linux"}[value] || value, size }
    },
    AbilityLayers: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.lu16)(buffer, offset)
        return { value: {"0":"cache","1":"base","2":"spectator","3":"commands","4":"editor"}[value] || value, size }
      })(buffer, offset)
      let { value: allowed, size: allowedSize } = (ctx.AbilitySet)(buffer, offset + typeSize)
      let { value: enabled, size: enabledSize } = (ctx.AbilitySet)(buffer, offset + typeSize + allowedSize)
      let { value: fly_speed, size: fly_speedSize } = (ctx.lf32)(buffer, offset + typeSize + allowedSize + enabledSize)
      let { value: walk_speed, size: walk_speedSize } = (ctx.lf32)(buffer, offset + typeSize + allowedSize + enabledSize + fly_speedSize)
      return { value: { type, allowed, enabled, fly_speed, walk_speed }, size: typeSize + allowedSize + enabledSize + fly_speedSize + walk_speedSize}
    },
    mcpe_packet: (buffer, offset) => {
      let { value: name, size: nameSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"1":"login","2":"play_status","3":"server_to_client_handshake","4":"client_to_server_handshake","5":"disconnect","6":"resource_packs_info","7":"resource_pack_stack","8":"resource_pack_client_response","9":"text","10":"set_time","11":"start_game","12":"add_player","13":"add_entity","14":"remove_entity","15":"add_item_entity","17":"take_item_entity","18":"move_entity","19":"move_player","20":"rider_jump","21":"update_block","22":"add_painting","23":"tick_sync","24":"level_sound_event_old","25":"level_event","26":"block_event","27":"entity_event","28":"mob_effect","29":"update_attributes","30":"inventory_transaction","31":"mob_equipment","32":"mob_armor_equipment","33":"interact","34":"block_pick_request","35":"entity_pick_request","36":"player_action","38":"hurt_armor","39":"set_entity_data","40":"set_entity_motion","41":"set_entity_link","42":"set_health","43":"set_spawn_position","44":"animate","45":"respawn","46":"container_open","47":"container_close","48":"player_hotbar","49":"inventory_content","50":"inventory_slot","51":"container_set_data","52":"crafting_data","53":"crafting_event","54":"gui_data_pick_item","55":"adventure_settings","56":"block_entity_data","57":"player_input","58":"level_chunk","59":"set_commands_enabled","60":"set_difficulty","61":"change_dimension","62":"set_player_game_type","63":"player_list","64":"simple_event","65":"event","66":"spawn_experience_orb","67":"clientbound_map_item_data","68":"map_info_request","69":"request_chunk_radius","70":"chunk_radius_update","71":"item_frame_drop_item","72":"game_rules_changed","73":"camera","74":"boss_event","75":"show_credits","76":"available_commands","77":"command_request","78":"command_block_update","79":"command_output","80":"update_trade","81":"update_equipment","82":"resource_pack_data_info","83":"resource_pack_chunk_data","84":"resource_pack_chunk_request","85":"transfer","86":"play_sound","87":"stop_sound","88":"set_title","89":"add_behavior_tree","90":"structure_block_update","91":"show_store_offer","92":"purchase_receipt","93":"player_skin","94":"sub_client_login","95":"initiate_web_socket_connection","96":"set_last_hurt_by","97":"book_edit","98":"npc_request","99":"photo_transfer","100":"modal_form_request","101":"modal_form_response","102":"server_settings_request","103":"server_settings_response","104":"show_profile","105":"set_default_game_type","106":"remove_objective","107":"set_display_objective","108":"set_score","109":"lab_table","110":"update_block_synced","111":"move_entity_delta","112":"set_scoreboard_identity","113":"set_local_player_as_initialized","114":"update_soft_enum","115":"network_stack_latency","117":"script_custom_event","118":"spawn_particle_effect","119":"available_entity_identifiers","120":"level_sound_event_v2","121":"network_chunk_publisher_update","122":"biome_definition_list","123":"level_sound_event","124":"level_event_generic","125":"lectern_update","126":"video_stream_connect","127":"add_ecs_entity","128":"remove_ecs_entity","129":"client_cache_status","130":"on_screen_texture_animation","131":"map_create_locked_copy","132":"structure_template_data_export_request","133":"structure_template_data_export_response","134":"update_block_properties","135":"client_cache_blob_status","136":"client_cache_miss_response","137":"education_settings","138":"emote","139":"multiplayer_settings","140":"settings_command","141":"anvil_damage","142":"completed_using_item","143":"network_settings","144":"player_auth_input","145":"creative_content","146":"player_enchant_options","147":"item_stack_request","148":"item_stack_response","149":"player_armor_damage","151":"update_player_game_type","152":"emote_list","153":"position_tracking_db_broadcast","154":"position_tracking_db_request","156":"packet_violation_warning","157":"motion_prediction_hints","158":"animate_entity","159":"camera_shake","160":"player_fog","161":"correct_player_move_prediction","162":"item_component","163":"filter_text_packet","164":"debug_renderer","165":"sync_entity_property","166":"add_volume_entity","167":"remove_volume_entity","168":"simulation_type","169":"npc_dialogue","170":"edu_uri_resource_packet","171":"create_photo","172":"update_subchunk_blocks","173":"photo_info_request","174":"subchunk","175":"subchunk_request","176":"client_start_item_cooldown","177":"script_message","178":"code_builder_source","179":"ticking_areas_load_status","180":"dimension_data","181":"agent_action","182":"change_mob_property","183":"lesson_progress","184":"request_ability","185":"request_permissions","186":"toast_request","187":"update_abilities","188":"update_adventure_settings","189":"death_info","190":"editor_network","191":"feature_registry","192":"server_stats","193":"request_network_settings","194":"game_test_request","195":"game_test_results","196":"update_client_input_locks","197":"client_cheat_ability","198":"camera_presets","199":"unlocked_recipes","300":"camera_instruction","301":"compressed_biome_definitions","302":"trim_data","303":"open_sign"}[value] || value, size }
      })(buffer, offset)
      let { value: params, size: paramsSize } = ((buffer, offset) => {
        switch (name) {
          case "login": return (ctx.packet_login)(buffer, offset)
          case "play_status": return (ctx.packet_play_status)(buffer, offset)
          case "server_to_client_handshake": return (ctx.packet_server_to_client_handshake)(buffer, offset)
          case "client_to_server_handshake": return (ctx.packet_client_to_server_handshake)(buffer, offset)
          case "disconnect": return (ctx.packet_disconnect)(buffer, offset)
          case "resource_packs_info": return (ctx.packet_resource_packs_info)(buffer, offset)
          case "resource_pack_stack": return (ctx.packet_resource_pack_stack)(buffer, offset)
          case "resource_pack_client_response": return (ctx.packet_resource_pack_client_response)(buffer, offset)
          case "text": return (ctx.packet_text)(buffer, offset)
          case "set_time": return (ctx.packet_set_time)(buffer, offset)
          case "start_game": return (ctx.packet_start_game)(buffer, offset)
          case "add_player": return (ctx.packet_add_player)(buffer, offset)
          case "add_entity": return (ctx.packet_add_entity)(buffer, offset)
          case "remove_entity": return (ctx.packet_remove_entity)(buffer, offset)
          case "add_item_entity": return (ctx.packet_add_item_entity)(buffer, offset)
          case "take_item_entity": return (ctx.packet_take_item_entity)(buffer, offset)
          case "move_entity": return (ctx.packet_move_entity)(buffer, offset)
          case "move_player": return (ctx.packet_move_player)(buffer, offset)
          case "rider_jump": return (ctx.packet_rider_jump)(buffer, offset)
          case "update_block": return (ctx.packet_update_block)(buffer, offset)
          case "add_painting": return (ctx.packet_add_painting)(buffer, offset)
          case "tick_sync": return (ctx.packet_tick_sync)(buffer, offset)
          case "level_sound_event_old": return (ctx.packet_level_sound_event_old)(buffer, offset)
          case "level_event": return (ctx.packet_level_event)(buffer, offset)
          case "block_event": return (ctx.packet_block_event)(buffer, offset)
          case "entity_event": return (ctx.packet_entity_event)(buffer, offset)
          case "mob_effect": return (ctx.packet_mob_effect)(buffer, offset)
          case "update_attributes": return (ctx.packet_update_attributes)(buffer, offset)
          case "inventory_transaction": return (ctx.packet_inventory_transaction)(buffer, offset)
          case "mob_equipment": return (ctx.packet_mob_equipment)(buffer, offset)
          case "mob_armor_equipment": return (ctx.packet_mob_armor_equipment)(buffer, offset)
          case "interact": return (ctx.packet_interact)(buffer, offset)
          case "block_pick_request": return (ctx.packet_block_pick_request)(buffer, offset)
          case "entity_pick_request": return (ctx.packet_entity_pick_request)(buffer, offset)
          case "player_action": return (ctx.packet_player_action)(buffer, offset)
          case "hurt_armor": return (ctx.packet_hurt_armor)(buffer, offset)
          case "set_entity_data": return (ctx.packet_set_entity_data)(buffer, offset)
          case "set_entity_motion": return (ctx.packet_set_entity_motion)(buffer, offset)
          case "set_entity_link": return (ctx.packet_set_entity_link)(buffer, offset)
          case "set_health": return (ctx.packet_set_health)(buffer, offset)
          case "set_spawn_position": return (ctx.packet_set_spawn_position)(buffer, offset)
          case "animate": return (ctx.packet_animate)(buffer, offset)
          case "respawn": return (ctx.packet_respawn)(buffer, offset)
          case "container_open": return (ctx.packet_container_open)(buffer, offset)
          case "container_close": return (ctx.packet_container_close)(buffer, offset)
          case "player_hotbar": return (ctx.packet_player_hotbar)(buffer, offset)
          case "inventory_content": return (ctx.packet_inventory_content)(buffer, offset)
          case "inventory_slot": return (ctx.packet_inventory_slot)(buffer, offset)
          case "container_set_data": return (ctx.packet_container_set_data)(buffer, offset)
          case "crafting_data": return (ctx.packet_crafting_data)(buffer, offset)
          case "crafting_event": return (ctx.packet_crafting_event)(buffer, offset)
          case "gui_data_pick_item": return (ctx.packet_gui_data_pick_item)(buffer, offset)
          case "adventure_settings": return (ctx.packet_adventure_settings)(buffer, offset)
          case "block_entity_data": return (ctx.packet_block_entity_data)(buffer, offset)
          case "player_input": return (ctx.packet_player_input)(buffer, offset)
          case "level_chunk": return (ctx.packet_level_chunk)(buffer, offset)
          case "set_commands_enabled": return (ctx.packet_set_commands_enabled)(buffer, offset)
          case "set_difficulty": return (ctx.packet_set_difficulty)(buffer, offset)
          case "change_dimension": return (ctx.packet_change_dimension)(buffer, offset)
          case "set_player_game_type": return (ctx.packet_set_player_game_type)(buffer, offset)
          case "player_list": return (ctx.packet_player_list)(buffer, offset)
          case "simple_event": return (ctx.packet_simple_event)(buffer, offset)
          case "event": return (ctx.packet_event)(buffer, offset)
          case "spawn_experience_orb": return (ctx.packet_spawn_experience_orb)(buffer, offset)
          case "clientbound_map_item_data": return (ctx.packet_clientbound_map_item_data)(buffer, offset)
          case "map_info_request": return (ctx.packet_map_info_request)(buffer, offset)
          case "request_chunk_radius": return (ctx.packet_request_chunk_radius)(buffer, offset)
          case "chunk_radius_update": return (ctx.packet_chunk_radius_update)(buffer, offset)
          case "item_frame_drop_item": return (ctx.packet_item_frame_drop_item)(buffer, offset)
          case "game_rules_changed": return (ctx.packet_game_rules_changed)(buffer, offset)
          case "camera": return (ctx.packet_camera)(buffer, offset)
          case "boss_event": return (ctx.packet_boss_event)(buffer, offset)
          case "show_credits": return (ctx.packet_show_credits)(buffer, offset)
          case "available_commands": return (ctx.packet_available_commands)(buffer, offset)
          case "command_request": return (ctx.packet_command_request)(buffer, offset)
          case "command_block_update": return (ctx.packet_command_block_update)(buffer, offset)
          case "command_output": return (ctx.packet_command_output)(buffer, offset)
          case "update_trade": return (ctx.packet_update_trade)(buffer, offset)
          case "update_equipment": return (ctx.packet_update_equipment)(buffer, offset)
          case "resource_pack_data_info": return (ctx.packet_resource_pack_data_info)(buffer, offset)
          case "resource_pack_chunk_data": return (ctx.packet_resource_pack_chunk_data)(buffer, offset)
          case "resource_pack_chunk_request": return (ctx.packet_resource_pack_chunk_request)(buffer, offset)
          case "transfer": return (ctx.packet_transfer)(buffer, offset)
          case "play_sound": return (ctx.packet_play_sound)(buffer, offset)
          case "stop_sound": return (ctx.packet_stop_sound)(buffer, offset)
          case "set_title": return (ctx.packet_set_title)(buffer, offset)
          case "add_behavior_tree": return (ctx.packet_add_behavior_tree)(buffer, offset)
          case "structure_block_update": return (ctx.packet_structure_block_update)(buffer, offset)
          case "show_store_offer": return (ctx.packet_show_store_offer)(buffer, offset)
          case "purchase_receipt": return (ctx.packet_purchase_receipt)(buffer, offset)
          case "player_skin": return (ctx.packet_player_skin)(buffer, offset)
          case "sub_client_login": return (ctx.packet_sub_client_login)(buffer, offset)
          case "initiate_web_socket_connection": return (ctx.packet_initiate_web_socket_connection)(buffer, offset)
          case "set_last_hurt_by": return (ctx.packet_set_last_hurt_by)(buffer, offset)
          case "book_edit": return (ctx.packet_book_edit)(buffer, offset)
          case "npc_request": return (ctx.packet_npc_request)(buffer, offset)
          case "photo_transfer": return (ctx.packet_photo_transfer)(buffer, offset)
          case "modal_form_request": return (ctx.packet_modal_form_request)(buffer, offset)
          case "modal_form_response": return (ctx.packet_modal_form_response)(buffer, offset)
          case "server_settings_request": return (ctx.packet_server_settings_request)(buffer, offset)
          case "server_settings_response": return (ctx.packet_server_settings_response)(buffer, offset)
          case "show_profile": return (ctx.packet_show_profile)(buffer, offset)
          case "set_default_game_type": return (ctx.packet_set_default_game_type)(buffer, offset)
          case "remove_objective": return (ctx.packet_remove_objective)(buffer, offset)
          case "set_display_objective": return (ctx.packet_set_display_objective)(buffer, offset)
          case "set_score": return (ctx.packet_set_score)(buffer, offset)
          case "lab_table": return (ctx.packet_lab_table)(buffer, offset)
          case "update_block_synced": return (ctx.packet_update_block_synced)(buffer, offset)
          case "move_entity_delta": return (ctx.packet_move_entity_delta)(buffer, offset)
          case "set_scoreboard_identity": return (ctx.packet_set_scoreboard_identity)(buffer, offset)
          case "set_local_player_as_initialized": return (ctx.packet_set_local_player_as_initialized)(buffer, offset)
          case "update_soft_enum": return (ctx.packet_update_soft_enum)(buffer, offset)
          case "network_stack_latency": return (ctx.packet_network_stack_latency)(buffer, offset)
          case "script_custom_event": return (ctx.packet_script_custom_event)(buffer, offset)
          case "spawn_particle_effect": return (ctx.packet_spawn_particle_effect)(buffer, offset)
          case "available_entity_identifiers": return (ctx.packet_available_entity_identifiers)(buffer, offset)
          case "level_sound_event_v2": return (ctx.packet_level_sound_event_v2)(buffer, offset)
          case "network_chunk_publisher_update": return (ctx.packet_network_chunk_publisher_update)(buffer, offset)
          case "biome_definition_list": return (ctx.packet_biome_definition_list)(buffer, offset)
          case "level_sound_event": return (ctx.packet_level_sound_event)(buffer, offset)
          case "level_event_generic": return (ctx.packet_level_event_generic)(buffer, offset)
          case "lectern_update": return (ctx.packet_lectern_update)(buffer, offset)
          case "video_stream_connect": return (ctx.packet_video_stream_connect)(buffer, offset)
          case "add_ecs_entity": return (ctx.packet_add_ecs_entity)(buffer, offset)
          case "remove_ecs_entity": return (ctx.packet_remove_ecs_entity)(buffer, offset)
          case "client_cache_status": return (ctx.packet_client_cache_status)(buffer, offset)
          case "on_screen_texture_animation": return (ctx.packet_on_screen_texture_animation)(buffer, offset)
          case "map_create_locked_copy": return (ctx.packet_map_create_locked_copy)(buffer, offset)
          case "structure_template_data_export_request": return (ctx.packet_structure_template_data_export_request)(buffer, offset)
          case "structure_template_data_export_response": return (ctx.packet_structure_template_data_export_response)(buffer, offset)
          case "update_block_properties": return (ctx.packet_update_block_properties)(buffer, offset)
          case "client_cache_blob_status": return (ctx.packet_client_cache_blob_status)(buffer, offset)
          case "client_cache_miss_response": return (ctx.packet_client_cache_miss_response)(buffer, offset)
          case "education_settings": return (ctx.packet_education_settings)(buffer, offset)
          case "emote": return (ctx.packet_emote)(buffer, offset)
          case "multiplayer_settings": return (ctx.packet_multiplayer_settings)(buffer, offset)
          case "settings_command": return (ctx.packet_settings_command)(buffer, offset)
          case "anvil_damage": return (ctx.packet_anvil_damage)(buffer, offset)
          case "completed_using_item": return (ctx.packet_completed_using_item)(buffer, offset)
          case "network_settings": return (ctx.packet_network_settings)(buffer, offset)
          case "player_auth_input": return (ctx.packet_player_auth_input)(buffer, offset)
          case "creative_content": return (ctx.packet_creative_content)(buffer, offset)
          case "player_enchant_options": return (ctx.packet_player_enchant_options)(buffer, offset)
          case "item_stack_request": return (ctx.packet_item_stack_request)(buffer, offset)
          case "item_stack_response": return (ctx.packet_item_stack_response)(buffer, offset)
          case "player_armor_damage": return (ctx.packet_player_armor_damage)(buffer, offset)
          case "update_player_game_type": return (ctx.packet_update_player_game_type)(buffer, offset)
          case "emote_list": return (ctx.packet_emote_list)(buffer, offset)
          case "position_tracking_db_request": return (ctx.packet_position_tracking_db_request)(buffer, offset)
          case "position_tracking_db_broadcast": return (ctx.packet_position_tracking_db_broadcast)(buffer, offset)
          case "packet_violation_warning": return (ctx.packet_packet_violation_warning)(buffer, offset)
          case "motion_prediction_hints": return (ctx.packet_motion_prediction_hints)(buffer, offset)
          case "animate_entity": return (ctx.packet_animate_entity)(buffer, offset)
          case "camera_shake": return (ctx.packet_camera_shake)(buffer, offset)
          case "player_fog": return (ctx.packet_player_fog)(buffer, offset)
          case "correct_player_move_prediction": return (ctx.packet_correct_player_move_prediction)(buffer, offset)
          case "item_component": return (ctx.packet_item_component)(buffer, offset)
          case "filter_text_packet": return (ctx.packet_filter_text_packet)(buffer, offset)
          case "debug_renderer": return (ctx.packet_debug_renderer)(buffer, offset)
          case "sync_entity_property": return (ctx.packet_sync_entity_property)(buffer, offset)
          case "add_volume_entity": return (ctx.packet_add_volume_entity)(buffer, offset)
          case "remove_volume_entity": return (ctx.packet_remove_volume_entity)(buffer, offset)
          case "simulation_type": return (ctx.packet_simulation_type)(buffer, offset)
          case "npc_dialogue": return (ctx.packet_npc_dialogue)(buffer, offset)
          case "edu_uri_resource_packet": return (ctx.packet_edu_uri_resource_packet)(buffer, offset)
          case "create_photo": return (ctx.packet_create_photo)(buffer, offset)
          case "update_subchunk_blocks": return (ctx.packet_update_subchunk_blocks)(buffer, offset)
          case "photo_info_request": return (ctx.packet_photo_info_request)(buffer, offset)
          case "subchunk": return (ctx.packet_subchunk)(buffer, offset)
          case "subchunk_request": return (ctx.packet_subchunk_request)(buffer, offset)
          case "client_start_item_cooldown": return (ctx.packet_client_start_item_cooldown)(buffer, offset)
          case "script_message": return (ctx.packet_script_message)(buffer, offset)
          case "code_builder_source": return (ctx.packet_code_builder_source)(buffer, offset)
          case "ticking_areas_load_status": return (ctx.packet_ticking_areas_load_status)(buffer, offset)
          case "dimension_data": return (ctx.packet_dimension_data)(buffer, offset)
          case "agent_action": return (ctx.packet_agent_action)(buffer, offset)
          case "change_mob_property": return (ctx.packet_change_mob_property)(buffer, offset)
          case "lesson_progress": return (ctx.packet_lesson_progress)(buffer, offset)
          case "request_ability": return (ctx.packet_request_ability)(buffer, offset)
          case "request_permissions": return (ctx.packet_request_permissions)(buffer, offset)
          case "toast_request": return (ctx.packet_toast_request)(buffer, offset)
          case "update_abilities": return (ctx.packet_update_abilities)(buffer, offset)
          case "update_adventure_settings": return (ctx.packet_update_adventure_settings)(buffer, offset)
          case "death_info": return (ctx.packet_death_info)(buffer, offset)
          case "editor_network": return (ctx.packet_editor_network)(buffer, offset)
          case "feature_registry": return (ctx.packet_feature_registry)(buffer, offset)
          case "server_stats": return (ctx.packet_server_stats)(buffer, offset)
          case "request_network_settings": return (ctx.packet_request_network_settings)(buffer, offset)
          case "game_test_request": return (ctx.packet_game_test_request)(buffer, offset)
          case "game_test_results": return (ctx.packet_game_test_results)(buffer, offset)
          case "update_client_input_locks": return (ctx.packet_update_client_input_locks)(buffer, offset)
          case "client_cheat_ability": return (ctx.packet_client_cheat_ability)(buffer, offset)
          case "camera_presets": return (ctx.packet_camera_presets)(buffer, offset)
          case "unlocked_recipes": return (ctx.packet_unlocked_recipes)(buffer, offset)
          case "camera_instruction": return (ctx.packet_camera_instruction)(buffer, offset)
          case "compressed_biome_definitions": return (ctx.packet_compressed_biome_definitions)(buffer, offset)
          case "trim_data": return (ctx.packet_trim_data)(buffer, offset)
          case "open_sign": return (ctx.packet_open_sign)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + nameSize)
      return { value: { name, params }, size: nameSize + paramsSize}
    },
    packet_login: (buffer, offset) => {
      let { value: protocol_version, size: protocol_versionSize } = (ctx.i32)(buffer, offset)
      let { value: tokens, size: tokensSize } = ((buffer, offset) => {
        const payloadSize = (ctx.varint)(buffer, offset)
          const { value, size } = ctx.LoginTokens(buffer, offset + payloadSize.size)
          return { value, size: size + payloadSize.size }
      })(buffer, offset + protocol_versionSize)
      return { value: { protocol_version, tokens }, size: protocol_versionSize + tokensSize}
    },
    LoginTokens: (buffer, offset) => {
      let { value: identity, size: identitySize } = (ctx.LittleString)(buffer, offset)
      let { value: client, size: clientSize } = (ctx.LittleString)(buffer, offset + identitySize)
      return { value: { identity, client }, size: identitySize + clientSize}
    },
    packet_play_status: (buffer, offset) => {
      let { value: status, size: statusSize } = ((buffer, offset) => {
        const { value, size } = (ctx.i32)(buffer, offset)
        return { value: {"0":"login_success","1":"failed_client","2":"failed_spawn","3":"player_spawn","4":"failed_invalid_tenant","5":"failed_vanilla_edu","6":"failed_edu_vanilla","7":"failed_server_full","8":"failed_editor_vanilla_mismatch","9":"failed_vanilla_editor_mismatch"}[value] || value, size }
      })(buffer, offset)
      return { value: { status }, size: statusSize}
    },
    packet_server_to_client_handshake: (buffer, offset) => {
      let { value: token, size: tokenSize } = (ctx.string)(buffer, offset)
      return { value: { token }, size: tokenSize}
    },
    packet_client_to_server_handshake: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_disconnect: (buffer, offset) => {
      let { value: hide_disconnect_reason, size: hide_disconnect_reasonSize } = (ctx.bool)(buffer, offset)
      let { value: message, size: messageSize } = (ctx.string)(buffer, offset + hide_disconnect_reasonSize)
      return { value: { hide_disconnect_reason, message }, size: hide_disconnect_reasonSize + messageSize}
    },
    packet_resource_packs_info: (buffer, offset) => {
      let { value: must_accept, size: must_acceptSize } = (ctx.bool)(buffer, offset)
      let { value: has_scripts, size: has_scriptsSize } = (ctx.bool)(buffer, offset + must_acceptSize)
      let { value: force_server_packs, size: force_server_packsSize } = (ctx.bool)(buffer, offset + must_acceptSize + has_scriptsSize)
      let { value: behaviour_packs, size: behaviour_packsSize } = (ctx.BehaviourPackInfos)(buffer, offset + must_acceptSize + has_scriptsSize + force_server_packsSize)
      let { value: texture_packs, size: texture_packsSize } = (ctx.TexturePackInfos)(buffer, offset + must_acceptSize + has_scriptsSize + force_server_packsSize + behaviour_packsSize)
      return { value: { must_accept, has_scripts, force_server_packs, behaviour_packs, texture_packs }, size: must_acceptSize + has_scriptsSize + force_server_packsSize + behaviour_packsSize + texture_packsSize}
    },
    packet_resource_pack_stack: (buffer, offset) => {
      let { value: must_accept, size: must_acceptSize } = (ctx.bool)(buffer, offset)
      let { value: behavior_packs, size: behavior_packsSize } = (ctx.ResourcePackIdVersions)(buffer, offset + must_acceptSize)
      let { value: resource_packs, size: resource_packsSize } = (ctx.ResourcePackIdVersions)(buffer, offset + must_acceptSize + behavior_packsSize)
      let { value: game_version, size: game_versionSize } = (ctx.string)(buffer, offset + must_acceptSize + behavior_packsSize + resource_packsSize)
      let { value: experiments, size: experimentsSize } = (ctx.Experiments)(buffer, offset + must_acceptSize + behavior_packsSize + resource_packsSize + game_versionSize)
      let { value: experiments_previously_used, size: experiments_previously_usedSize } = (ctx.bool)(buffer, offset + must_acceptSize + behavior_packsSize + resource_packsSize + game_versionSize + experimentsSize)
      return { value: { must_accept, behavior_packs, resource_packs, game_version, experiments, experiments_previously_used }, size: must_acceptSize + behavior_packsSize + resource_packsSize + game_versionSize + experimentsSize + experiments_previously_usedSize}
    },
    packet_resource_pack_client_response: (buffer, offset) => {
      let { value: response_status, size: response_statusSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"none","1":"refused","2":"send_packs","3":"have_all_packs","4":"completed"}[value] || value, size }
      })(buffer, offset)
      let { value: resourcepackids, size: resourcepackidsSize } = (ctx.ResourcePackIds)(buffer, offset + response_statusSize)
      return { value: { response_status, resourcepackids }, size: response_statusSize + resourcepackidsSize}
    },
    packet_text: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"raw","1":"chat","2":"translation","3":"popup","4":"jukebox_popup","5":"tip","6":"system","7":"whisper","8":"announcement","9":"json_whisper","10":"json","11":"json_announcement"}[value] || value, size }
      })(buffer, offset)
      let { value: needs_translation, size: needs_translationSize } = (ctx.bool)(buffer, offset + typeSize)
      let { value: source_name, size: source_nameSize } = ((buffer, offset) => {
        switch (type) {
          case "chat": return (ctx.string)(buffer, offset)
          case "whisper": return (ctx.string)(buffer, offset)
          case "announcement": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + needs_translationSize)
      let { value: message, size: messageSize } = ((buffer, offset) => {
        switch (type) {
          case "chat": return (ctx.string)(buffer, offset)
          case "whisper": return (ctx.string)(buffer, offset)
          case "announcement": return (ctx.string)(buffer, offset)
          case "raw": return (ctx.string)(buffer, offset)
          case "tip": return (ctx.string)(buffer, offset)
          case "system": return (ctx.string)(buffer, offset)
          case "json_whisper": return (ctx.string)(buffer, offset)
          case "json": return (ctx.string)(buffer, offset)
          case "json_announcement": return (ctx.string)(buffer, offset)
          case "translation": return (ctx.string)(buffer, offset)
          case "popup": return (ctx.string)(buffer, offset)
          case "jukebox_popup": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + needs_translationSize + source_nameSize)
      let { value: parameters, size: parametersSize } = ((buffer, offset) => {
        switch (type) {
          case "translation": return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
          case "popup": return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
          case "jukebox_popup": return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + needs_translationSize + source_nameSize + messageSize)
      let { value: xuid, size: xuidSize } = (ctx.string)(buffer, offset + typeSize + needs_translationSize + source_nameSize + messageSize + parametersSize)
      let { value: platform_chat_id, size: platform_chat_idSize } = (ctx.string)(buffer, offset + typeSize + needs_translationSize + source_nameSize + messageSize + parametersSize + xuidSize)
      return { value: { type, needs_translation, source_name, message, parameters, xuid, platform_chat_id }, size: typeSize + needs_translationSize + source_nameSize + messageSize + parametersSize + xuidSize + platform_chat_idSize}
    },
    packet_set_time: (buffer, offset) => {
      let { value: time, size: timeSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { time }, size: timeSize}
    },
    packet_start_game: (buffer, offset) => {
      let { value: entity_id, size: entity_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset + entity_idSize)
      let { value: player_gamemode, size: player_gamemodeSize } = (ctx.GameMode)(buffer, offset + entity_idSize + runtime_entity_idSize)
      let { value: player_position, size: player_positionSize } = (ctx.vec3f)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize)
      let { value: rotation, size: rotationSize } = (ctx.vec2f)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize)
      let { value: seed, size: seedSize } = (ctx.lu64)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize)
      let { value: biome_type, size: biome_typeSize } = (ctx.li16)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize)
      let { value: biome_name, size: biome_nameSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize)
      let { value: dimension, size: dimensionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"overworld","1":"nether","2":"end"}[value] || value, size }
      })(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize)
      let { value: generator, size: generatorSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize)
      let { value: world_gamemode, size: world_gamemodeSize } = (ctx.GameMode)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize)
      let { value: difficulty, size: difficultySize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize)
      let { value: spawn_position, size: spawn_positionSize } = (ctx.BlockCoordinates)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize)
      let { value: achievements_disabled, size: achievements_disabledSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize)
      let { value: editor_world, size: editor_worldSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize)
      let { value: created_in_editor, size: created_in_editorSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize)
      let { value: exported_from_editor, size: exported_from_editorSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize)
      let { value: day_cycle_stop_time, size: day_cycle_stop_timeSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize)
      let { value: edu_offer, size: edu_offerSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize)
      let { value: edu_features_enabled, size: edu_features_enabledSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize)
      let { value: edu_product_uuid, size: edu_product_uuidSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize)
      let { value: rain_level, size: rain_levelSize } = (ctx.lf32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize)
      let { value: lightning_level, size: lightning_levelSize } = (ctx.lf32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize)
      let { value: has_confirmed_platform_locked_content, size: has_confirmed_platform_locked_contentSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize)
      let { value: is_multiplayer, size: is_multiplayerSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize)
      let { value: broadcast_to_lan, size: broadcast_to_lanSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize)
      let { value: xbox_live_broadcast_mode, size: xbox_live_broadcast_modeSize } = (ctx.varint)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize)
      let { value: platform_broadcast_mode, size: platform_broadcast_modeSize } = (ctx.varint)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize)
      let { value: enable_commands, size: enable_commandsSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize)
      let { value: is_texturepacks_required, size: is_texturepacks_requiredSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize)
      let { value: gamerules, size: gamerulesSize } = (ctx.GameRules)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize)
      let { value: experiments, size: experimentsSize } = (ctx.Experiments)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize)
      let { value: experiments_previously_used, size: experiments_previously_usedSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize)
      let { value: bonus_chest, size: bonus_chestSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize)
      let { value: map_enabled, size: map_enabledSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize)
      let { value: permission_level, size: permission_levelSize } = (ctx.PermissionLevel)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize)
      let { value: server_chunk_tick_range, size: server_chunk_tick_rangeSize } = (ctx.li32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize)
      let { value: has_locked_behavior_pack, size: has_locked_behavior_packSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize)
      let { value: has_locked_resource_pack, size: has_locked_resource_packSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize)
      let { value: is_from_locked_world_template, size: is_from_locked_world_templateSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize)
      let { value: msa_gamertags_only, size: msa_gamertags_onlySize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize)
      let { value: is_from_world_template, size: is_from_world_templateSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize)
      let { value: is_world_template_option_locked, size: is_world_template_option_lockedSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize)
      let { value: only_spawn_v1_villagers, size: only_spawn_v1_villagersSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize)
      let { value: persona_disabled, size: persona_disabledSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize)
      let { value: custom_skins_disabled, size: custom_skins_disabledSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize)
      let { value: emote_chat_muted, size: emote_chat_mutedSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize)
      let { value: game_version, size: game_versionSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize)
      let { value: limited_world_width, size: limited_world_widthSize } = (ctx.li32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize)
      let { value: limited_world_length, size: limited_world_lengthSize } = (ctx.li32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize)
      let { value: is_new_nether, size: is_new_netherSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize)
      let { value: edu_resource_uri, size: edu_resource_uriSize } = (ctx.EducationSharedResourceURI)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize)
      let { value: experimental_gameplay_override, size: experimental_gameplay_overrideSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize)
      let { value: chat_restriction_level, size: chat_restriction_levelSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"none","1":"dropped","2":"disabled"}[value] || value, size }
      })(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize)
      let { value: disable_player_interactions, size: disable_player_interactionsSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize)
      let { value: level_id, size: level_idSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize)
      let { value: world_name, size: world_nameSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize)
      let { value: premium_world_template_id, size: premium_world_template_idSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize)
      let { value: is_trial, size: is_trialSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize)
      let { value: movement_authority, size: movement_authoritySize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"client","1":"server","2":"server_with_rewind"}[value] || value, size }
      })(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize)
      let { value: rewind_history_size, size: rewind_history_sizeSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize)
      let { value: server_authoritative_block_breaking, size: server_authoritative_block_breakingSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize)
      let { value: current_tick, size: current_tickSize } = (ctx.li64)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize)
      let { value: enchantment_seed, size: enchantment_seedSize } = (ctx.zigzag32)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize)
      let { value: block_properties, size: block_propertiesSize } = (ctx.BlockProperties)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize)
      let { value: itemstates, size: itemstatesSize } = (ctx.Itemstates)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize)
      let { value: multiplayer_correlation_id, size: multiplayer_correlation_idSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize)
      let { value: server_authoritative_inventory, size: server_authoritative_inventorySize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize + multiplayer_correlation_idSize)
      let { value: engine, size: engineSize } = (ctx.string)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize + multiplayer_correlation_idSize + server_authoritative_inventorySize)
      let { value: property_data, size: property_dataSize } = (ctx.nbt)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize + multiplayer_correlation_idSize + server_authoritative_inventorySize + engineSize)
      let { value: block_pallette_checksum, size: block_pallette_checksumSize } = (ctx.lu64)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize + multiplayer_correlation_idSize + server_authoritative_inventorySize + engineSize + property_dataSize)
      let { value: world_template_id, size: world_template_idSize } = (ctx.uuid)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize + multiplayer_correlation_idSize + server_authoritative_inventorySize + engineSize + property_dataSize + block_pallette_checksumSize)
      let { value: client_side_generation, size: client_side_generationSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize + multiplayer_correlation_idSize + server_authoritative_inventorySize + engineSize + property_dataSize + block_pallette_checksumSize + world_template_idSize)
      let { value: block_network_ids_are_hashes, size: block_network_ids_are_hashesSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize + multiplayer_correlation_idSize + server_authoritative_inventorySize + engineSize + property_dataSize + block_pallette_checksumSize + world_template_idSize + client_side_generationSize)
      let { value: server_controlled_sound, size: server_controlled_soundSize } = (ctx.bool)(buffer, offset + entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize + multiplayer_correlation_idSize + server_authoritative_inventorySize + engineSize + property_dataSize + block_pallette_checksumSize + world_template_idSize + client_side_generationSize + block_network_ids_are_hashesSize)
      return { value: { entity_id, runtime_entity_id, player_gamemode, player_position, rotation, seed, biome_type, biome_name, dimension, generator, world_gamemode, difficulty, spawn_position, achievements_disabled, editor_world, created_in_editor, exported_from_editor, day_cycle_stop_time, edu_offer, edu_features_enabled, edu_product_uuid, rain_level, lightning_level, has_confirmed_platform_locked_content, is_multiplayer, broadcast_to_lan, xbox_live_broadcast_mode, platform_broadcast_mode, enable_commands, is_texturepacks_required, gamerules, experiments, experiments_previously_used, bonus_chest, map_enabled, permission_level, server_chunk_tick_range, has_locked_behavior_pack, has_locked_resource_pack, is_from_locked_world_template, msa_gamertags_only, is_from_world_template, is_world_template_option_locked, only_spawn_v1_villagers, persona_disabled, custom_skins_disabled, emote_chat_muted, game_version, limited_world_width, limited_world_length, is_new_nether, edu_resource_uri, experimental_gameplay_override, chat_restriction_level, disable_player_interactions, level_id, world_name, premium_world_template_id, is_trial, movement_authority, rewind_history_size, server_authoritative_block_breaking, current_tick, enchantment_seed, block_properties, itemstates, multiplayer_correlation_id, server_authoritative_inventory, engine, property_data, block_pallette_checksum, world_template_id, client_side_generation, block_network_ids_are_hashes, server_controlled_sound }, size: entity_idSize + runtime_entity_idSize + player_gamemodeSize + player_positionSize + rotationSize + seedSize + biome_typeSize + biome_nameSize + dimensionSize + generatorSize + world_gamemodeSize + difficultySize + spawn_positionSize + achievements_disabledSize + editor_worldSize + created_in_editorSize + exported_from_editorSize + day_cycle_stop_timeSize + edu_offerSize + edu_features_enabledSize + edu_product_uuidSize + rain_levelSize + lightning_levelSize + has_confirmed_platform_locked_contentSize + is_multiplayerSize + broadcast_to_lanSize + xbox_live_broadcast_modeSize + platform_broadcast_modeSize + enable_commandsSize + is_texturepacks_requiredSize + gamerulesSize + experimentsSize + experiments_previously_usedSize + bonus_chestSize + map_enabledSize + permission_levelSize + server_chunk_tick_rangeSize + has_locked_behavior_packSize + has_locked_resource_packSize + is_from_locked_world_templateSize + msa_gamertags_onlySize + is_from_world_templateSize + is_world_template_option_lockedSize + only_spawn_v1_villagersSize + persona_disabledSize + custom_skins_disabledSize + emote_chat_mutedSize + game_versionSize + limited_world_widthSize + limited_world_lengthSize + is_new_netherSize + edu_resource_uriSize + experimental_gameplay_overrideSize + chat_restriction_levelSize + disable_player_interactionsSize + level_idSize + world_nameSize + premium_world_template_idSize + is_trialSize + movement_authoritySize + rewind_history_sizeSize + server_authoritative_block_breakingSize + current_tickSize + enchantment_seedSize + block_propertiesSize + itemstatesSize + multiplayer_correlation_idSize + server_authoritative_inventorySize + engineSize + property_dataSize + block_pallette_checksumSize + world_template_idSize + client_side_generationSize + block_network_ids_are_hashesSize + server_controlled_soundSize}
    },
    packet_add_player: (buffer, offset) => {
      let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
      let { value: username, size: usernameSize } = (ctx.string)(buffer, offset + uuidSize)
      let { value: runtime_id, size: runtime_idSize } = (ctx.varint64)(buffer, offset + uuidSize + usernameSize)
      let { value: platform_chat_id, size: platform_chat_idSize } = (ctx.string)(buffer, offset + uuidSize + usernameSize + runtime_idSize)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize)
      let { value: velocity, size: velocitySize } = (ctx.vec3f)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize)
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize)
      let { value: yaw, size: yawSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.lf32)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize)
      let { value: held_item, size: held_itemSize } = (ctx.Item)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize)
      let { value: gamemode, size: gamemodeSize } = (ctx.GameMode)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize)
      let { value: metadata, size: metadataSize } = (ctx.MetadataDictionary)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize)
      let { value: properties, size: propertiesSize } = (ctx.EntityProperties)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize + metadataSize)
      let { value: unique_id, size: unique_idSize } = (ctx.li64)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize + metadataSize + propertiesSize)
      let { value: permission_level, size: permission_levelSize } = (ctx.PermissionLevel)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize + metadataSize + propertiesSize + unique_idSize)
      let { value: command_permission, size: command_permissionSize } = (ctx.CommandPermissionLevel)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize + metadataSize + propertiesSize + unique_idSize + permission_levelSize)
      let { value: abilities, size: abilitiesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.u8)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.AbilityLayers)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize + metadataSize + propertiesSize + unique_idSize + permission_levelSize + command_permissionSize)
      let { value: links, size: linksSize } = (ctx.Links)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize + metadataSize + propertiesSize + unique_idSize + permission_levelSize + command_permissionSize + abilitiesSize)
      let { value: device_id, size: device_idSize } = (ctx.string)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize + metadataSize + propertiesSize + unique_idSize + permission_levelSize + command_permissionSize + abilitiesSize + linksSize)
      let { value: device_os, size: device_osSize } = (ctx.DeviceOS)(buffer, offset + uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize + metadataSize + propertiesSize + unique_idSize + permission_levelSize + command_permissionSize + abilitiesSize + linksSize + device_idSize)
      return { value: { uuid, username, runtime_id, platform_chat_id, position, velocity, pitch, yaw, head_yaw, held_item, gamemode, metadata, properties, unique_id, permission_level, command_permission, abilities, links, device_id, device_os }, size: uuidSize + usernameSize + runtime_idSize + platform_chat_idSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + held_itemSize + gamemodeSize + metadataSize + propertiesSize + unique_idSize + permission_levelSize + command_permissionSize + abilitiesSize + linksSize + device_idSize + device_osSize}
    },
    packet_add_entity: (buffer, offset) => {
      let { value: unique_id, size: unique_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: runtime_id, size: runtime_idSize } = (ctx.varint64)(buffer, offset + unique_idSize)
      let { value: entity_type, size: entity_typeSize } = (ctx.string)(buffer, offset + unique_idSize + runtime_idSize)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize)
      let { value: velocity, size: velocitySize } = (ctx.vec3f)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize + positionSize)
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize + positionSize + velocitySize)
      let { value: yaw, size: yawSize } = (ctx.lf32)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize + positionSize + velocitySize + pitchSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.lf32)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize + positionSize + velocitySize + pitchSize + yawSize)
      let { value: body_yaw, size: body_yawSize } = (ctx.lf32)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize)
      let { value: attributes, size: attributesSize } = (ctx.EntityAttributes)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + body_yawSize)
      let { value: metadata, size: metadataSize } = (ctx.MetadataDictionary)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + body_yawSize + attributesSize)
      let { value: properties, size: propertiesSize } = (ctx.EntityProperties)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + body_yawSize + attributesSize + metadataSize)
      let { value: links, size: linksSize } = (ctx.Links)(buffer, offset + unique_idSize + runtime_idSize + entity_typeSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + body_yawSize + attributesSize + metadataSize + propertiesSize)
      return { value: { unique_id, runtime_id, entity_type, position, velocity, pitch, yaw, head_yaw, body_yaw, attributes, metadata, properties, links }, size: unique_idSize + runtime_idSize + entity_typeSize + positionSize + velocitySize + pitchSize + yawSize + head_yawSize + body_yawSize + attributesSize + metadataSize + propertiesSize + linksSize}
    },
    packet_remove_entity: (buffer, offset) => {
      let { value: entity_id_self, size: entity_id_selfSize } = (ctx.zigzag64)(buffer, offset)
      return { value: { entity_id_self }, size: entity_id_selfSize}
    },
    packet_add_item_entity: (buffer, offset) => {
      let { value: entity_id_self, size: entity_id_selfSize } = (ctx.zigzag64)(buffer, offset)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset + entity_id_selfSize)
      let { value: item, size: itemSize } = (ctx.Item)(buffer, offset + entity_id_selfSize + runtime_entity_idSize)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize)
      let { value: velocity, size: velocitySize } = (ctx.vec3f)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + positionSize)
      let { value: metadata, size: metadataSize } = (ctx.MetadataDictionary)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + positionSize + velocitySize)
      let { value: is_from_fishing, size: is_from_fishingSize } = (ctx.bool)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + itemSize + positionSize + velocitySize + metadataSize)
      return { value: { entity_id_self, runtime_entity_id, item, position, velocity, metadata, is_from_fishing }, size: entity_id_selfSize + runtime_entity_idSize + itemSize + positionSize + velocitySize + metadataSize + is_from_fishingSize}
    },
    packet_take_item_entity: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: target, size: targetSize } = (ctx.varint)(buffer, offset + runtime_entity_idSize)
      return { value: { runtime_entity_id, target }, size: runtime_entity_idSize + targetSize}
    },
    packet_move_entity: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: flags, size: flagsSize } = (ctx.u8)(buffer, offset + runtime_entity_idSize)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + runtime_entity_idSize + flagsSize)
      let { value: rotation, size: rotationSize } = (ctx.Rotation)(buffer, offset + runtime_entity_idSize + flagsSize + positionSize)
      return { value: { runtime_entity_id, flags, position, rotation }, size: runtime_entity_idSize + flagsSize + positionSize + rotationSize}
    },
    packet_move_player: (buffer, offset) => {
      let { value: runtime_id, size: runtime_idSize } = (ctx.varint)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + runtime_idSize)
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset + runtime_idSize + positionSize)
      let { value: yaw, size: yawSize } = (ctx.lf32)(buffer, offset + runtime_idSize + positionSize + pitchSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.lf32)(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize)
      let { value: mode, size: modeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"normal","1":"reset","2":"teleport","3":"rotation"}[value] || value, size }
      })(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize)
      let { value: on_ground, size: on_groundSize } = (ctx.bool)(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize)
      let { value: ridden_runtime_id, size: ridden_runtime_idSize } = (ctx.varint)(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize + on_groundSize)
      let { value: teleport, size: teleportSize } = ((buffer, offset) => {
        switch (mode) {
          case "teleport": return ((buffer, offset) => {
            let { value: cause1, size: cause1Size } = ((buffer, offset) => {
              const { value, size } = (ctx.li32)(buffer, offset)
              return { value: {"0":"unknown","1":"projectile","2":"chorus_fruit","3":"command","4":"behavior"}[value] || value, size }
            })(buffer, offset)
            let { value: source_entity_type, size: source_entity_typeSize } = (ctx.LegacyEntityType)(buffer, offset + cause1Size)
            return { value: { cause: cause1, source_entity_type }, size: cause1Size + source_entity_typeSize}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize + on_groundSize + ridden_runtime_idSize)
      let { value: tick, size: tickSize } = (ctx.varint64)(buffer, offset + runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize + on_groundSize + ridden_runtime_idSize + teleportSize)
      return { value: { runtime_id, position, pitch, yaw, head_yaw, mode, on_ground, ridden_runtime_id, teleport, tick }, size: runtime_idSize + positionSize + pitchSize + yawSize + head_yawSize + modeSize + on_groundSize + ridden_runtime_idSize + teleportSize + tickSize}
    },
    packet_rider_jump: (buffer, offset) => {
      let { value: jump_strength, size: jump_strengthSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { jump_strength }, size: jump_strengthSize}
    },
    packet_update_block: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: block_runtime_id, size: block_runtime_idSize } = (ctx.varint)(buffer, offset + positionSize)
      let { value: flags, size: flagsSize } = (ctx.UpdateBlockFlags)(buffer, offset + positionSize + block_runtime_idSize)
      let { value: layer, size: layerSize } = (ctx.varint)(buffer, offset + positionSize + block_runtime_idSize + flagsSize)
      return { value: { position, block_runtime_id, flags, layer }, size: positionSize + block_runtime_idSize + flagsSize + layerSize}
    },
    packet_add_painting: (buffer, offset) => {
      let { value: entity_id_self, size: entity_id_selfSize } = (ctx.zigzag64)(buffer, offset)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset + entity_id_selfSize)
      let { value: coordinates, size: coordinatesSize } = (ctx.vec3f)(buffer, offset + entity_id_selfSize + runtime_entity_idSize)
      let { value: direction, size: directionSize } = (ctx.zigzag32)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + coordinatesSize)
      let { value: title, size: titleSize } = (ctx.string)(buffer, offset + entity_id_selfSize + runtime_entity_idSize + coordinatesSize + directionSize)
      return { value: { entity_id_self, runtime_entity_id, coordinates, direction, title }, size: entity_id_selfSize + runtime_entity_idSize + coordinatesSize + directionSize + titleSize}
    },
    packet_tick_sync: (buffer, offset) => {
      let { value: request_time, size: request_timeSize } = (ctx.li64)(buffer, offset)
      let { value: response_time, size: response_timeSize } = (ctx.li64)(buffer, offset + request_timeSize)
      return { value: { request_time, response_time }, size: request_timeSize + response_timeSize}
    },
    packet_level_sound_event_old: (buffer, offset) => {
      let { value: sound_id, size: sound_idSize } = (ctx.u8)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + sound_idSize)
      let { value: block_id, size: block_idSize } = (ctx.zigzag32)(buffer, offset + sound_idSize + positionSize)
      let { value: entity_type, size: entity_typeSize } = (ctx.zigzag32)(buffer, offset + sound_idSize + positionSize + block_idSize)
      let { value: is_baby_mob, size: is_baby_mobSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize)
      let { value: is_global, size: is_globalSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize)
      return { value: { sound_id, position, block_id, entity_type, is_baby_mob, is_global }, size: sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize + is_globalSize}
    },
    packet_level_event: (buffer, offset) => {
      let { value: event, size: eventSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"1000":"sound_click","1001":"sound_click_fail","1002":"sound_shoot","1003":"sound_door","1004":"sound_fizz","1005":"sound_ignite","1007":"sound_ghast","1008":"sound_ghast_shoot","1009":"sound_blaze_shoot","1010":"sound_door_bump","1012":"sound_door_crash","1018":"sound_enderman_teleport","1020":"sound_anvil_break","1021":"sound_anvil_use","1022":"sound_anvil_fall","1030":"sound_pop","1032":"sound_portal","1040":"sound_itemframe_add_item","1041":"sound_itemframe_remove","1042":"sound_itemframe_place","1043":"sound_itemframe_remove_item","1044":"sound_itemframe_rotate_item","1050":"sound_camera","1051":"sound_orb","1052":"sound_totem","1060":"sound_armor_stand_break","1061":"sound_armor_stand_hit","1062":"sound_armor_stand_fall","1063":"sound_armor_stand_place","1064":"pointed_dripstone_land","1065":"dye_used","1066":"ink_sack_used","2000":"particle_shoot","2001":"particle_destroy","2002":"particle_splash","2003":"particle_eye_despawn","2004":"particle_spawn","2005":"particle_crop_growth","2006":"particle_guardian_curse","2007":"particle_death_smoke","2008":"particle_block_force_field","2009":"particle_projectile_hit","2010":"particle_dragon_egg_teleport","2011":"particle_crop_eaten","2012":"particle_critical","2013":"particle_enderman_teleport","2014":"particle_punch_block","2015":"particle_bubble","2016":"particle_evaporate","2017":"particle_destroy_armor_stand","2018":"particle_breaking_egg","2019":"particle_destroy_egg","2020":"particle_evaporate_water","2021":"particle_destroy_block_no_sound","2022":"particle_knockback_roar","2023":"particle_teleport_trail","2024":"particle_point_cloud","2025":"particle_explosion","2026":"particle_block_explosion","2027":"particle_vibration_signal","2028":"particle_dripstone_drip","2029":"particle_fizz_effect","2030":"particle_wax_on","2031":"particle_wax_off","2032":"particle_scrape","2033":"particle_electric_spark","2034":"particle_turtle_egg","2035":"particle_sculk_shriek","2036":"sculk_catalyst_bloom","2037":"sculk_charge","2038":"sculk_charge_pop","2039":"sonic_explosion","3001":"start_rain","3002":"start_thunder","3003":"stop_rain","3004":"stop_thunder","3005":"pause_game","3006":"pause_game_no_screen","3007":"set_game_speed","3500":"redstone_trigger","3501":"cauldron_explode","3502":"cauldron_dye_armor","3503":"cauldron_clean_armor","3504":"cauldron_fill_potion","3505":"cauldron_take_potion","3506":"cauldron_fill_water","3507":"cauldron_take_water","3508":"cauldron_add_dye","3509":"cauldron_clean_banner","3600":"block_start_break","3601":"block_stop_break","3602":"block_break_speed","3603":"particle_punch_block_down","3604":"particle_punch_block_up","3605":"particle_punch_block_north","3606":"particle_punch_block_south","3607":"particle_punch_block_west","3608":"particle_punch_block_east","4000":"set_data","9800":"players_sleeping","9801":"sleeping_players","16384":"add_particle_mask","16385":"add_particle_bubble","16386":"add_particle_bubble_manual","16387":"add_particle_critical","16388":"add_particle_block_force_field","16389":"add_particle_smoke","16390":"add_particle_explode","16391":"add_particle_evaporation","16392":"add_particle_flame","16393":"add_particle_candle_flame","16394":"add_particle_lava","16395":"add_particle_large_smoke","16396":"add_particle_redstone","16397":"add_particle_rising_red_dust","16398":"add_particle_item_break","16399":"add_particle_snowball_poof","16400":"add_particle_huge_explode","16401":"add_particle_huge_explode_seed","16402":"add_particle_mob_flame","16403":"add_particle_heart","16404":"add_particle_terrain","16405":"add_particle_town_aura","16406":"add_particle_portal","16408":"add_particle_water_splash","16409":"add_particle_water_splash_manual","16410":"add_particle_water_wake","16411":"add_particle_drip_water","16412":"add_particle_drip_lava","16413":"add_particle_drip_honey","16414":"add_particle_stalactite_drip_water","16415":"add_particle_stalactite_drip_lava","16416":"add_particle_falling_dust","16417":"add_particle_mob_spell","16418":"add_particle_mob_spell_ambient","16419":"add_particle_mob_spell_instantaneous","16420":"add_particle_ink","16421":"add_particle_slime","16422":"add_particle_rain_splash","16423":"add_particle_villager_angry","16424":"add_particle_villager_happy","16425":"add_particle_enchantment_table","16426":"add_particle_tracking_emitter","16427":"add_particle_note","16428":"add_particle_witch_spell","16429":"add_particle_carrot","16430":"add_particle_mob_appearance","16431":"add_particle_end_rod","16432":"add_particle_dragons_breath","16433":"add_particle_spit","16434":"add_particle_totem","16435":"add_particle_food","16436":"add_particle_fireworks_starter","16437":"add_particle_fireworks_spark","16438":"add_particle_fireworks_overlay","16439":"add_particle_balloon_gas","16440":"add_particle_colored_flame","16441":"add_particle_sparkler","16442":"add_particle_conduit","16443":"add_particle_bubble_column_up","16444":"add_particle_bubble_column_down","16445":"add_particle_sneeze","16446":"add_particle_shulker_bullet","16447":"add_particle_bleach","16448":"add_particle_dragon_destroy_block","16449":"add_particle_mycelium_dust","16450":"add_particle_falling_red_dust","16451":"add_particle_campfire_smoke","16452":"add_particle_tall_campfire_smoke","16453":"add_particle_dragon_breath_fire","16454":"add_particle_dragon_breath_trail","16455":"add_particle_blue_flame","16456":"add_particle_soul","16457":"add_particle_obsidian_tear","16458":"add_particle_portal_reverse","16459":"add_particle_snowflake","16460":"add_particle_vibration_signal","16461":"add_particle_sculk_sensor_redstone","16462":"add_particle_spore_blossom_shower","16463":"add_particle_spore_blossom_ambient","16464":"add_particle_wax","16465":"add_particle_electric_spark"}[value] || value, size }
      })(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + eventSize)
      let { value: data, size: dataSize } = (ctx.zigzag32)(buffer, offset + eventSize + positionSize)
      return { value: { event, position, data }, size: eventSize + positionSize + dataSize}
    },
    packet_block_event: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"sound","1":"change_state"}[value] || value, size }
      })(buffer, offset + positionSize)
      let { value: data, size: dataSize } = (ctx.zigzag32)(buffer, offset + positionSize + typeSize)
      return { value: { position, type, data }, size: positionSize + typeSize + dataSize}
    },
    packet_entity_event: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: event_id, size: event_idSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"1":"jump","2":"hurt_animation","3":"death_animation","4":"arm_swing","5":"stop_attack","6":"tame_fail","7":"tame_success","8":"shake_wet","9":"use_item","10":"eat_grass_animation","11":"fish_hook_bubble","12":"fish_hook_position","13":"fish_hook_hook","14":"fish_hook_tease","15":"squid_ink_cloud","16":"zombie_villager_cure","18":"respawn","19":"iron_golem_offer_flower","20":"iron_golem_withdraw_flower","21":"love_particles","22":"villager_angry","23":"villager_happy","24":"witch_spell_particles","25":"firework_particles","26":"in_love_particles","27":"silverfish_spawn_animation","28":"guardian_attack","29":"witch_drink_potion","30":"witch_throw_potion","31":"minecart_tnt_prime_fuse","32":"creeper_prime_fuse","33":"air_supply_expired","34":"player_add_xp_levels","35":"elder_guardian_curse","36":"agent_arm_swing","37":"ender_dragon_death","38":"dust_particles","39":"arrow_shake","57":"eating_item","60":"baby_animal_feed","61":"death_smoke_cloud","62":"complete_trade","63":"remove_leash","64":"caravan","65":"consume_totem","66":"player_check_treasure_hunter_achievement","67":"entity_spawn","68":"dragon_puke","69":"item_entity_merge","70":"start_swim","71":"balloon_pop","72":"treasure_hunt","73":"agent_summon","74":"charged_crossbow","75":"fall","76":"grow_up","77":"vibration_detected","78":"drink_milk"}[value] || value, size }
      })(buffer, offset + runtime_entity_idSize)
      let { value: data, size: dataSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + event_idSize)
      return { value: { runtime_entity_id, event_id, data }, size: runtime_entity_idSize + event_idSize + dataSize}
    },
    packet_mob_effect: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: event_id, size: event_idSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"1":"add","2":"update","3":"remove"}[value] || value, size }
      })(buffer, offset + runtime_entity_idSize)
      let { value: effect_id, size: effect_idSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + event_idSize)
      let { value: amplifier, size: amplifierSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + event_idSize + effect_idSize)
      let { value: particles, size: particlesSize } = (ctx.bool)(buffer, offset + runtime_entity_idSize + event_idSize + effect_idSize + amplifierSize)
      let { value: duration, size: durationSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + event_idSize + effect_idSize + amplifierSize + particlesSize)
      return { value: { runtime_entity_id, event_id, effect_id, amplifier, particles, duration }, size: runtime_entity_idSize + event_idSize + effect_idSize + amplifierSize + particlesSize + durationSize}
    },
    packet_update_attributes: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: attributes, size: attributesSize } = (ctx.PlayerAttributes)(buffer, offset + runtime_entity_idSize)
      let { value: tick, size: tickSize } = (ctx.varint64)(buffer, offset + runtime_entity_idSize + attributesSize)
      return { value: { runtime_entity_id, attributes, tick }, size: runtime_entity_idSize + attributesSize + tickSize}
    },
    packet_inventory_transaction: (buffer, offset) => {
      let { value: transaction, size: transactionSize } = (ctx.Transaction)(buffer, offset)
      return { value: { transaction }, size: transactionSize}
    },
    packet_mob_equipment: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: item, size: itemSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize)
      let { value: slot, size: slotSize } = (ctx.u8)(buffer, offset + runtime_entity_idSize + itemSize)
      let { value: selected_slot, size: selected_slotSize } = (ctx.u8)(buffer, offset + runtime_entity_idSize + itemSize + slotSize)
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset + runtime_entity_idSize + itemSize + slotSize + selected_slotSize)
      return { value: { runtime_entity_id, item, slot, selected_slot, window_id }, size: runtime_entity_idSize + itemSize + slotSize + selected_slotSize + window_idSize}
    },
    packet_mob_armor_equipment: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: helmet, size: helmetSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize)
      let { value: chestplate, size: chestplateSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize + helmetSize)
      let { value: leggings, size: leggingsSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize + helmetSize + chestplateSize)
      let { value: boots, size: bootsSize } = (ctx.Item)(buffer, offset + runtime_entity_idSize + helmetSize + chestplateSize + leggingsSize)
      return { value: { runtime_entity_id, helmet, chestplate, leggings, boots }, size: runtime_entity_idSize + helmetSize + chestplateSize + leggingsSize + bootsSize}
    },
    packet_interact: (buffer, offset) => {
      let { value: action_id, size: action_idSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"3":"leave_vehicle","4":"mouse_over_entity","5":"npc_open","6":"open_inventory"}[value] || value, size }
      })(buffer, offset)
      let { value: target_entity_id, size: target_entity_idSize } = (ctx.varint64)(buffer, offset + action_idSize)
      let { value: position, size: positionSize } = ((buffer, offset) => {
        switch (action_id) {
          case "mouse_over_entity": return (ctx.vec3f)(buffer, offset)
          case "leave_vehicle": return (ctx.vec3f)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + action_idSize + target_entity_idSize)
      return { value: { action_id, target_entity_id, position }, size: action_idSize + target_entity_idSize + positionSize}
    },
    packet_block_pick_request: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.zigzag32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.zigzag32)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.zigzag32)(buffer, offset + xSize + ySize)
      let { value: add_user_data, size: add_user_dataSize } = (ctx.bool)(buffer, offset + xSize + ySize + zSize)
      let { value: selected_slot, size: selected_slotSize } = (ctx.u8)(buffer, offset + xSize + ySize + zSize + add_user_dataSize)
      return { value: { x, y, z, add_user_data, selected_slot }, size: xSize + ySize + zSize + add_user_dataSize + selected_slotSize}
    },
    packet_entity_pick_request: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.lu64)(buffer, offset)
      let { value: selected_slot, size: selected_slotSize } = (ctx.u8)(buffer, offset + runtime_entity_idSize)
      let { value: with_data, size: with_dataSize } = (ctx.bool)(buffer, offset + runtime_entity_idSize + selected_slotSize)
      return { value: { runtime_entity_id, selected_slot, with_data }, size: runtime_entity_idSize + selected_slotSize + with_dataSize}
    },
    packet_player_action: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: action, size: actionSize } = (ctx.Action)(buffer, offset + runtime_entity_idSize)
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset + runtime_entity_idSize + actionSize)
      let { value: result_position, size: result_positionSize } = (ctx.BlockCoordinates)(buffer, offset + runtime_entity_idSize + actionSize + positionSize)
      let { value: face, size: faceSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize + actionSize + positionSize + result_positionSize)
      return { value: { runtime_entity_id, action, position, result_position, face }, size: runtime_entity_idSize + actionSize + positionSize + result_positionSize + faceSize}
    },
    packet_hurt_armor: (buffer, offset) => {
      let { value: cause, size: causeSize } = (ctx.zigzag32)(buffer, offset)
      let { value: damage, size: damageSize } = (ctx.zigzag32)(buffer, offset + causeSize)
      let { value: armor_slots, size: armor_slotsSize } = (ctx.zigzag64)(buffer, offset + causeSize + damageSize)
      return { value: { cause, damage, armor_slots }, size: causeSize + damageSize + armor_slotsSize}
    },
    packet_set_entity_data: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: metadata, size: metadataSize } = (ctx.MetadataDictionary)(buffer, offset + runtime_entity_idSize)
      let { value: properties, size: propertiesSize } = (ctx.EntityProperties)(buffer, offset + runtime_entity_idSize + metadataSize)
      let { value: tick, size: tickSize } = (ctx.varint64)(buffer, offset + runtime_entity_idSize + metadataSize + propertiesSize)
      return { value: { runtime_entity_id, metadata, properties, tick }, size: runtime_entity_idSize + metadataSize + propertiesSize + tickSize}
    },
    packet_set_entity_motion: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: velocity, size: velocitySize } = (ctx.vec3f)(buffer, offset + runtime_entity_idSize)
      return { value: { runtime_entity_id, velocity }, size: runtime_entity_idSize + velocitySize}
    },
    packet_set_entity_link: (buffer, offset) => {
      let { value: link, size: linkSize } = (ctx.Link)(buffer, offset)
      return { value: { link }, size: linkSize}
    },
    packet_set_health: (buffer, offset) => {
      let { value: health, size: healthSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { health }, size: healthSize}
    },
    packet_set_spawn_position: (buffer, offset) => {
      let { value: spawn_type, size: spawn_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"player","1":"world"}[value] || value, size }
      })(buffer, offset)
      let { value: player_position, size: player_positionSize } = (ctx.BlockCoordinates)(buffer, offset + spawn_typeSize)
      let { value: dimension, size: dimensionSize } = (ctx.zigzag32)(buffer, offset + spawn_typeSize + player_positionSize)
      let { value: world_position, size: world_positionSize } = (ctx.BlockCoordinates)(buffer, offset + spawn_typeSize + player_positionSize + dimensionSize)
      return { value: { spawn_type, player_position, dimension, world_position }, size: spawn_typeSize + player_positionSize + dimensionSize + world_positionSize}
    },
    packet_animate: (buffer, offset) => {
      let { value: action_id, size: action_idSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"none","1":"swing_arm","2":"unknown","3":"wake_up","4":"critical_hit","5":"magic_critical_hit","128":"row_right","129":"row_left"}[value] || value, size }
      })(buffer, offset)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset + action_idSize)
      let { value: boat_rowing_time, size: boat_rowing_timeSize } = ((buffer, offset) => {
        switch (action_id) {
          case "row_right": return (ctx.lf32)(buffer, offset)
          case "row_left": return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + action_idSize + runtime_entity_idSize)
      return { value: { action_id, runtime_entity_id, boat_rowing_time }, size: action_idSize + runtime_entity_idSize + boat_rowing_timeSize}
    },
    packet_respawn: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset)
      let { value: state, size: stateSize } = (ctx.u8)(buffer, offset + positionSize)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset + positionSize + stateSize)
      return { value: { position, state, runtime_entity_id }, size: positionSize + stateSize + runtime_entity_idSize}
    },
    packet_container_open: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: window_type, size: window_typeSize } = (ctx.WindowType)(buffer, offset + window_idSize)
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset + window_idSize + window_typeSize)
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.zigzag64)(buffer, offset + window_idSize + window_typeSize + coordinatesSize)
      return { value: { window_id, window_type, coordinates, runtime_entity_id }, size: window_idSize + window_typeSize + coordinatesSize + runtime_entity_idSize}
    },
    packet_container_close: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: server, size: serverSize } = (ctx.bool)(buffer, offset + window_idSize)
      return { value: { window_id, server }, size: window_idSize + serverSize}
    },
    packet_player_hotbar: (buffer, offset) => {
      let { value: selected_slot, size: selected_slotSize } = (ctx.varint)(buffer, offset)
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset + selected_slotSize)
      let { value: select_slot, size: select_slotSize } = (ctx.bool)(buffer, offset + selected_slotSize + window_idSize)
      return { value: { selected_slot, window_id, select_slot }, size: selected_slotSize + window_idSize + select_slotSize}
    },
    packet_inventory_content: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowIDVarint)(buffer, offset)
      let { value: input, size: inputSize } = (ctx.ItemStacks)(buffer, offset + window_idSize)
      return { value: { window_id, input }, size: window_idSize + inputSize}
    },
    packet_inventory_slot: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowIDVarint)(buffer, offset)
      let { value: slot, size: slotSize } = (ctx.varint)(buffer, offset + window_idSize)
      let { value: item, size: itemSize } = (ctx.Item)(buffer, offset + window_idSize + slotSize)
      return { value: { window_id, slot, item }, size: window_idSize + slotSize + itemSize}
    },
    packet_container_set_data: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: property, size: propertySize } = (ctx.zigzag32)(buffer, offset + window_idSize)
      let { value: value1, size: value1Size } = (ctx.zigzag32)(buffer, offset + window_idSize + propertySize)
      return { value: { window_id, property, value: value1 }, size: window_idSize + propertySize + value1Size}
    },
    packet_crafting_data: (buffer, offset) => {
      let { value: recipes, size: recipesSize } = (ctx.Recipes)(buffer, offset)
      let { value: potion_type_recipes, size: potion_type_recipesSize } = (ctx.PotionTypeRecipes)(buffer, offset + recipesSize)
      let { value: potion_container_recipes, size: potion_container_recipesSize } = (ctx.PotionContainerChangeRecipes)(buffer, offset + recipesSize + potion_type_recipesSize)
      let { value: material_reducers, size: material_reducersSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.MaterialReducer)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + recipesSize + potion_type_recipesSize + potion_container_recipesSize)
      let { value: clear_recipes, size: clear_recipesSize } = (ctx.bool)(buffer, offset + recipesSize + potion_type_recipesSize + potion_container_recipesSize + material_reducersSize)
      return { value: { recipes, potion_type_recipes, potion_container_recipes, material_reducers, clear_recipes }, size: recipesSize + potion_type_recipesSize + potion_container_recipesSize + material_reducersSize + clear_recipesSize}
    },
    packet_crafting_event: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: recipe_type, size: recipe_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"inventory","1":"crafting","2":"workbench"}[value] || value, size }
      })(buffer, offset + window_idSize)
      let { value: recipe_id, size: recipe_idSize } = (ctx.uuid)(buffer, offset + window_idSize + recipe_typeSize)
      let { value: input, size: inputSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.Item)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + window_idSize + recipe_typeSize + recipe_idSize)
      let { value: result, size: resultSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.Item)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + window_idSize + recipe_typeSize + recipe_idSize + inputSize)
      return { value: { window_id, recipe_type, recipe_id, input, result }, size: window_idSize + recipe_typeSize + recipe_idSize + inputSize + resultSize}
    },
    packet_gui_data_pick_item: (buffer, offset) => {
      let { value: item_name, size: item_nameSize } = (ctx.string)(buffer, offset)
      let { value: item_effects, size: item_effectsSize } = (ctx.string)(buffer, offset + item_nameSize)
      let { value: hotbar_slot, size: hotbar_slotSize } = (ctx.li32)(buffer, offset + item_nameSize + item_effectsSize)
      return { value: { item_name, item_effects, hotbar_slot }, size: item_nameSize + item_effectsSize + hotbar_slotSize}
    },
    packet_adventure_settings: (buffer, offset) => {
      let { value: flags, size: flagsSize } = (ctx.AdventureFlags)(buffer, offset)
      let { value: command_permission, size: command_permissionSize } = (ctx.CommandPermissionLevelVarint)(buffer, offset + flagsSize)
      let { value: action_permissions, size: action_permissionsSize } = (ctx.ActionPermissions)(buffer, offset + flagsSize + command_permissionSize)
      let { value: permission_level, size: permission_levelSize } = (ctx.PermissionLevel)(buffer, offset + flagsSize + command_permissionSize + action_permissionsSize)
      let { value: custom_stored_permissions, size: custom_stored_permissionsSize } = (ctx.varint)(buffer, offset + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize)
      let { value: user_id, size: user_idSize } = (ctx.li64)(buffer, offset + flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize + custom_stored_permissionsSize)
      return { value: { flags, command_permission, action_permissions, permission_level, custom_stored_permissions, user_id }, size: flagsSize + command_permissionSize + action_permissionsSize + permission_levelSize + custom_stored_permissionsSize + user_idSize}
    },
    packet_block_entity_data: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset + positionSize)
      return { value: { position, nbt }, size: positionSize + nbtSize}
    },
    packet_player_input: (buffer, offset) => {
      let { value: motion_x, size: motion_xSize } = (ctx.lf32)(buffer, offset)
      let { value: motion_z, size: motion_zSize } = (ctx.lf32)(buffer, offset + motion_xSize)
      let { value: jumping, size: jumpingSize } = (ctx.bool)(buffer, offset + motion_xSize + motion_zSize)
      let { value: sneaking, size: sneakingSize } = (ctx.bool)(buffer, offset + motion_xSize + motion_zSize + jumpingSize)
      return { value: { motion_x, motion_z, jumping, sneaking }, size: motion_xSize + motion_zSize + jumpingSize + sneakingSize}
    },
    packet_level_chunk: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.zigzag32)(buffer, offset)
      let { value: z, size: zSize } = (ctx.zigzag32)(buffer, offset + xSize)
      let { value: sub_chunk_count, size: sub_chunk_countSize } = (ctx.varint)(buffer, offset + xSize + zSize)
      let { value: highest_subchunk_count, size: highest_subchunk_countSize } = ((buffer, offset) => {
        switch (sub_chunk_count) {
          case -2: return (ctx.lu16)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + xSize + zSize + sub_chunk_countSize)
      let { value: cache_enabled, size: cache_enabledSize } = (ctx.bool)(buffer, offset + xSize + zSize + sub_chunk_countSize + highest_subchunk_countSize)
      let { value: blobs, size: blobsSize } = ((buffer, offset) => {
        switch (cache_enabled) {
          case true: return ((buffer, offset) => {
            let { value: hashes, size: hashesSize } = ((buffer, offset) => {
              const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
              if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
              const data = []
              let size = countSize
              for (let i = 0; i < count; i++) {
                const elem = (ctx.lu64)(buffer, offset + size)
                data.push(elem.value)
                size += elem.size
              }
              return { value: data, size }
            })(buffer, offset)
            return { value: { hashes }, size: hashesSize}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + xSize + zSize + sub_chunk_countSize + highest_subchunk_countSize + cache_enabledSize)
      let { value: payload, size: payloadSize } = (ctx.ByteArray)(buffer, offset + xSize + zSize + sub_chunk_countSize + highest_subchunk_countSize + cache_enabledSize + blobsSize)
      return { value: { x, z, sub_chunk_count, highest_subchunk_count, cache_enabled, blobs, payload }, size: xSize + zSize + sub_chunk_countSize + highest_subchunk_countSize + cache_enabledSize + blobsSize + payloadSize}
    },
    packet_set_commands_enabled: (buffer, offset) => {
      let { value: enabled, size: enabledSize } = (ctx.bool)(buffer, offset)
      return { value: { enabled }, size: enabledSize}
    },
    packet_set_difficulty: (buffer, offset) => {
      let { value: difficulty, size: difficultySize } = (ctx.varint)(buffer, offset)
      return { value: { difficulty }, size: difficultySize}
    },
    packet_change_dimension: (buffer, offset) => {
      let { value: dimension, size: dimensionSize } = (ctx.zigzag32)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + dimensionSize)
      let { value: respawn, size: respawnSize } = (ctx.bool)(buffer, offset + dimensionSize + positionSize)
      return { value: { dimension, position, respawn }, size: dimensionSize + positionSize + respawnSize}
    },
    packet_set_player_game_type: (buffer, offset) => {
      let { value: gamemode, size: gamemodeSize } = (ctx.GameMode)(buffer, offset)
      return { value: { gamemode }, size: gamemodeSize}
    },
    packet_player_list: (buffer, offset) => {
      let { value: records, size: recordsSize } = (ctx.PlayerRecords)(buffer, offset)
      return { value: { records }, size: recordsSize}
    },
    packet_simple_event: (buffer, offset) => {
      let { value: event_type, size: event_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.lu16)(buffer, offset)
        return { value: {"0":"uninitialized_subtype","1":"enable_commands","2":"disable_commands","3":"unlock_world_template_settings"}[value] || value, size }
      })(buffer, offset)
      return { value: { event_type }, size: event_typeSize}
    },
    packet_event: (buffer, offset) => {
      let { value: runtime_id, size: runtime_idSize } = (ctx.varint64)(buffer, offset)
      let { value: event_type, size: event_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"achievement_awarded","1":"entity_interact","2":"portal_built","3":"portal_used","4":"mob_killed","5":"cauldron_used","6":"player_death","7":"boss_killed","8":"agent_command","9":"agent_created","10":"banner_pattern_removed","11":"commaned_executed","12":"fish_bucketed","13":"mob_born","14":"pet_died","15":"cauldron_block_used","16":"composter_block_used","17":"bell_block_used","18":"actor_definition","19":"raid_update","20":"player_movement_anomaly","21":"player_moement_corrected","22":"honey_harvested","23":"target_block_hit","24":"piglin_barter","25":"waxed_or_unwaxed_copper","26":"code_builder_runtime_action","27":"code_builder_scoreboard","28":"strider_ridden_in_lava_in_overworld","29":"sneak_close_to_sculk_sensor","30":"careful_restoration"}[value] || value, size }
      })(buffer, offset + runtime_idSize)
      let { value: use_player_id, size: use_player_idSize } = (ctx.u8)(buffer, offset + runtime_idSize + event_typeSize)
      let { value: event_data, size: event_dataSize } = (ctx.restBuffer)(buffer, offset + runtime_idSize + event_typeSize + use_player_idSize)
      return { value: { runtime_id, event_type, use_player_id, event_data }, size: runtime_idSize + event_typeSize + use_player_idSize + event_dataSize}
    },
    packet_spawn_experience_orb: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset)
      let { value: count, size: countSize } = (ctx.zigzag32)(buffer, offset + positionSize)
      return { value: { position, count }, size: positionSize + countSize}
    },
    packet_clientbound_map_item_data: (buffer, offset) => {
      let { value: map_id, size: map_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: update_flags, size: update_flagsSize } = (ctx.UpdateMapFlags)(buffer, offset + map_idSize)
      let { value: dimension, size: dimensionSize } = (ctx.u8)(buffer, offset + map_idSize + update_flagsSize)
      let { value: locked, size: lockedSize } = (ctx.bool)(buffer, offset + map_idSize + update_flagsSize + dimensionSize)
      let { value: origin, size: originSize } = (ctx.vec3i)(buffer, offset + map_idSize + update_flagsSize + dimensionSize + lockedSize)
      let { value: included_in, size: included_inSize } = ((buffer, offset) => {
        switch (update_flags.initialisation) {
          case true: return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.zigzag64)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + map_idSize + update_flagsSize + dimensionSize + lockedSize + originSize)
      let { value: scale, size: scaleSize } = ((buffer, offset) => {
        switch (update_flags.initialisation || update_flags.decoration || update_flags.texture) {
          case true: return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + map_idSize + update_flagsSize + dimensionSize + lockedSize + originSize + included_inSize)
      let { value: tracked, size: trackedSize } = ((buffer, offset) => {
        switch (update_flags.decoration) {
          case true: return ((buffer, offset) => {
            let { value: objects, size: objectsSize } = ((buffer, offset) => {
              const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
              if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
              const data = []
              let size = countSize
              for (let i = 0; i < count; i++) {
                const elem = (ctx.TrackedObject)(buffer, offset + size)
                data.push(elem.value)
                size += elem.size
              }
              return { value: data, size }
            })(buffer, offset)
            let { value: decorations, size: decorationsSize } = ((buffer, offset) => {
              const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
              if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
              const data = []
              let size = countSize
              for (let i = 0; i < count; i++) {
                const elem = (ctx.MapDecoration)(buffer, offset + size)
                data.push(elem.value)
                size += elem.size
              }
              return { value: data, size }
            })(buffer, offset + objectsSize)
            return { value: { objects, decorations }, size: objectsSize + decorationsSize}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + map_idSize + update_flagsSize + dimensionSize + lockedSize + originSize + included_inSize + scaleSize)
      let { value: texture, size: textureSize } = ((buffer, offset) => {
        switch (update_flags.texture) {
          case true: return ((buffer, offset) => {
            let { value: width1, size: width1Size } = (ctx.zigzag32)(buffer, offset)
            let { value: height1, size: height1Size } = (ctx.zigzag32)(buffer, offset + width1Size)
            let { value: x_offset, size: x_offsetSize } = (ctx.zigzag32)(buffer, offset + width1Size + height1Size)
            let { value: y_offset, size: y_offsetSize } = (ctx.zigzag32)(buffer, offset + width1Size + height1Size + x_offsetSize)
            let { value: pixels, size: pixelsSize } = ((buffer, offset) => {
              const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
              if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
              const data = []
              let size = countSize
              for (let i = 0; i < count; i++) {
                const elem = (ctx.varint)(buffer, offset + size)
                data.push(elem.value)
                size += elem.size
              }
              return { value: data, size }
            })(buffer, offset + width1Size + height1Size + x_offsetSize + y_offsetSize)
            return { value: { width: width1, height: height1, x_offset, y_offset, pixels }, size: width1Size + height1Size + x_offsetSize + y_offsetSize + pixelsSize}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + map_idSize + update_flagsSize + dimensionSize + lockedSize + originSize + included_inSize + scaleSize + trackedSize)
      return { value: { map_id, update_flags, dimension, locked, origin, included_in, scale, tracked, texture }, size: map_idSize + update_flagsSize + dimensionSize + lockedSize + originSize + included_inSize + scaleSize + trackedSize + textureSize}
    },
    packet_map_info_request: (buffer, offset) => {
      let { value: map_id, size: map_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: client_pixels, size: client_pixelsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.lu32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: rgba, size: rgbaSize } = (ctx.li32)(buffer, offset)
          let { value: index, size: indexSize } = (ctx.lu16)(buffer, offset + rgbaSize)
          return { value: { rgba, index }, size: rgbaSize + indexSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + map_idSize)
      return { value: { map_id, client_pixels }, size: map_idSize + client_pixelsSize}
    },
    packet_request_chunk_radius: (buffer, offset) => {
      let { value: chunk_radius, size: chunk_radiusSize } = (ctx.zigzag32)(buffer, offset)
      let { value: max_radius, size: max_radiusSize } = (ctx.u8)(buffer, offset + chunk_radiusSize)
      return { value: { chunk_radius, max_radius }, size: chunk_radiusSize + max_radiusSize}
    },
    packet_chunk_radius_update: (buffer, offset) => {
      let { value: chunk_radius, size: chunk_radiusSize } = (ctx.zigzag32)(buffer, offset)
      return { value: { chunk_radius }, size: chunk_radiusSize}
    },
    packet_item_frame_drop_item: (buffer, offset) => {
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset)
      return { value: { coordinates }, size: coordinatesSize}
    },
    packet_game_rules_changed: (buffer, offset) => {
      let { value: rules, size: rulesSize } = (ctx.GameRules)(buffer, offset)
      return { value: { rules }, size: rulesSize}
    },
    packet_camera: (buffer, offset) => {
      let { value: camera_entity_unique_id, size: camera_entity_unique_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: target_player_unique_id, size: target_player_unique_idSize } = (ctx.zigzag64)(buffer, offset + camera_entity_unique_idSize)
      return { value: { camera_entity_unique_id, target_player_unique_id }, size: camera_entity_unique_idSize + target_player_unique_idSize}
    },
    packet_boss_event: (buffer, offset) => {
      let { value: boss_entity_id, size: boss_entity_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"show_bar","1":"register_player","2":"hide_bar","3":"unregister_player","4":"set_bar_progress","5":"set_bar_title","6":"update_properties","7":"texture","8":"query"}[value] || value, size }
      })(buffer, offset + boss_entity_idSize)
      let { value: title, size: titleSize } = ((buffer, offset) => {
        switch (type) {
          case "show_bar": return (ctx.string)(buffer, offset)
          case "set_bar_title": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize)
      let { value: progress, size: progressSize } = ((buffer, offset) => {
        switch (type) {
          case "show_bar": return (ctx.lf32)(buffer, offset)
          case "set_bar_progress": return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + titleSize)
      let { value: screen_darkening, size: screen_darkeningSize } = ((buffer, offset) => {
        switch (type) {
          case "show_bar": return (ctx.li16)(buffer, offset)
          case "update_properties": return (ctx.li16)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + titleSize + progressSize)
      let { value: color, size: colorSize } = ((buffer, offset) => {
        switch (type) {
          case "show_bar": return (ctx.varint)(buffer, offset)
          case "update_properties": return (ctx.varint)(buffer, offset)
          case "texture": return (ctx.varint)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + titleSize + progressSize + screen_darkeningSize)
      let { value: overlay, size: overlaySize } = ((buffer, offset) => {
        switch (type) {
          case "show_bar": return (ctx.varint)(buffer, offset)
          case "update_properties": return (ctx.varint)(buffer, offset)
          case "texture": return (ctx.varint)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + titleSize + progressSize + screen_darkeningSize + colorSize)
      let { value: player_id, size: player_idSize } = ((buffer, offset) => {
        switch (type) {
          case "register_player": return (ctx.zigzag64)(buffer, offset)
          case "unregister_player": return (ctx.zigzag64)(buffer, offset)
          case "query": return (ctx.zigzag64)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + boss_entity_idSize + typeSize + titleSize + progressSize + screen_darkeningSize + colorSize + overlaySize)
      return { value: { boss_entity_id, type, title, progress, screen_darkening, color, overlay, player_id }, size: boss_entity_idSize + typeSize + titleSize + progressSize + screen_darkeningSize + colorSize + overlaySize + player_idSize}
    },
    packet_show_credits: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: status, size: statusSize } = (ctx.zigzag32)(buffer, offset + runtime_entity_idSize)
      return { value: { runtime_entity_id, status }, size: runtime_entity_idSize + statusSize}
    },
    packet_available_commands: (buffer, offset) => {
      let { value: values_len, size: values_lenSize } = (ctx.varint)(buffer, offset)
      let { value: _enum_type, size: _enum_typeSize } = ((buffer, offset) => {
        if (values_len <= 0xff) return { value: 'byte', size: 0 }
            if (values_len <= 0xffff) return { value: 'short', size: 0 }
            if (values_len <= 0xffffff) return { value: 'int', size: 0 }
      })(buffer, offset + values_lenSize)
      let { value: enum_values, size: enum_valuesSize } = ((buffer, offset) => {
        const count = values_len
        const countSize = 0
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize)
      let { value: suffixes, size: suffixesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize)
      let { value: enums, size: enumsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
          let { value: values, size: valuesSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = ((buffer, offset) => {
              switch (_enum_type) {
                case "byte": return (ctx.u8)(buffer, offset)
                case "short": return (ctx.lu16)(buffer, offset)
                case "int": return (ctx.lu32)(buffer, offset)
                default: return (ctx.void)(buffer, offset)
              }
            })(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + name1Size)
          return { value: { name: name1, values }, size: name1Size + valuesSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize)
      let { value: command_data, size: command_dataSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
          let { value: description, size: descriptionSize } = (ctx.string)(buffer, offset + name1Size)
          let { value: flags1, size: flags1Size } = (ctx.lu16)(buffer, offset + name1Size + descriptionSize)
          let { value: permission_level1, size: permission_level1Size } = (ctx.u8)(buffer, offset + name1Size + descriptionSize + flags1Size)
          let { value: alias, size: aliasSize } = (ctx.li32)(buffer, offset + name1Size + descriptionSize + flags1Size + permission_level1Size)
          let { value: overloads, size: overloadsSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = ((buffer, offset) => {
              const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
              if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
              const data = []
              let size = countSize
              for (let i = 0; i < count; i++) {
                const elem = ((buffer, offset) => {
                let { value: parameter_name, size: parameter_nameSize } = (ctx.string)(buffer, offset)
                let { value: value_type, size: value_typeSize } = ((buffer, offset) => {
                  const { value, size } = (ctx.lu16)(buffer, offset)
                  return { value: {"1":"int","3":"float","4":"value","5":"wildcard_int","6":"operator","7":"command_operator","8":"target","10":"wildcard_target","17":"file_path","23":"integer_range","43":"equipment_slots","44":"string","52":"block_position","53":"position","55":"message","58":"raw_text","62":"json","71":"block_states","74":"command"}[value] || value, size }
                })(buffer, offset + parameter_nameSize)
                let { value: enum_type, size: enum_typeSize } = ((buffer, offset) => {
                  const { value, size } = (ctx.lu16)(buffer, offset)
                  return { value: {"16":"valid","32":"enum","256":"suffixed","1024":"soft_enum"}[value] || value, size }
                })(buffer, offset + parameter_nameSize + value_typeSize)
                let { value: optional, size: optionalSize } = (ctx.bool)(buffer, offset + parameter_nameSize + value_typeSize + enum_typeSize)
                let { value: options, size: optionsSize } = (ctx.CommandFlags)(buffer, offset + parameter_nameSize + value_typeSize + enum_typeSize + optionalSize)
                return { value: { parameter_name, value_type, enum_type, optional, options }, size: parameter_nameSize + value_typeSize + enum_typeSize + optionalSize + optionsSize}
              })(buffer, offset + size)
                data.push(elem.value)
                size += elem.size
              }
              return { value: data, size }
            })(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + name1Size + descriptionSize + flags1Size + permission_level1Size + aliasSize)
          return { value: { name: name1, description, flags: flags1, permission_level: permission_level1, alias, overloads }, size: name1Size + descriptionSize + flags1Size + permission_level1Size + aliasSize + overloadsSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize + enumsSize)
      let { value: dynamic_enums, size: dynamic_enumsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
          let { value: values, size: valuesSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + name1Size)
          return { value: { name: name1, values }, size: name1Size + valuesSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize + enumsSize + command_dataSize)
      let { value: enum_constraints, size: enum_constraintsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: value_index, size: value_indexSize } = (ctx.li32)(buffer, offset)
          let { value: enum_index, size: enum_indexSize } = (ctx.li32)(buffer, offset + value_indexSize)
          let { value: constraints, size: constraintsSize } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = ((buffer, offset) => {
              let { value: constraint, size: constraintSize } = ((buffer, offset) => {
                const { value, size } = (ctx.u8)(buffer, offset)
                return { value: {"0":"cheats_enabled","1":"operator_permissions","2":"host_permissions"}[value] || value, size }
              })(buffer, offset)
              return { value: { constraint }, size: constraintSize}
            })(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + value_indexSize + enum_indexSize)
          return { value: { value_index, enum_index, constraints }, size: value_indexSize + enum_indexSize + constraintsSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize + enumsSize + command_dataSize + dynamic_enumsSize)
      return { value: { values_len, _enum_type, enum_values, suffixes, enums, command_data, dynamic_enums, enum_constraints }, size: values_lenSize + _enum_typeSize + enum_valuesSize + suffixesSize + enumsSize + command_dataSize + dynamic_enumsSize + enum_constraintsSize}
    },
    packet_command_request: (buffer, offset) => {
      let { value: command, size: commandSize } = (ctx.string)(buffer, offset)
      let { value: origin, size: originSize } = (ctx.CommandOrigin)(buffer, offset + commandSize)
      let { value: internal, size: internalSize } = (ctx.bool)(buffer, offset + commandSize + originSize)
      let { value: version, size: versionSize } = (ctx.varint)(buffer, offset + commandSize + originSize + internalSize)
      return { value: { command, origin, internal, version }, size: commandSize + originSize + internalSize + versionSize}
    },
    packet_command_block_update: (buffer, offset) => {
      let { value: is_block, size: is_blockSize } = (ctx.bool)(buffer, offset)
      let { value: position, size: positionSize } = ((buffer, offset) => {
        switch (is_block) {
          case true: return (ctx.BlockCoordinates)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + is_blockSize)
      let { value: mode, size: modeSize } = ((buffer, offset) => {
        switch (is_block) {
          case true: return ((buffer, offset) => {
            const { value, size } = (ctx.varint)(buffer, offset)
            return { value: {"0":"impulse","1":"repeat","2":"chain"}[value] || value, size }
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + is_blockSize + positionSize)
      let { value: needs_redstone, size: needs_redstoneSize } = ((buffer, offset) => {
        switch (is_block) {
          case true: return (ctx.bool)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + is_blockSize + positionSize + modeSize)
      let { value: conditional, size: conditionalSize } = ((buffer, offset) => {
        switch (is_block) {
          case true: return (ctx.bool)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + is_blockSize + positionSize + modeSize + needs_redstoneSize)
      let { value: minecart_entity_runtime_id, size: minecart_entity_runtime_idSize } = ((buffer, offset) => {
        switch (is_block) {
          case false: return (ctx.varint64)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + is_blockSize + positionSize + modeSize + needs_redstoneSize + conditionalSize)
      let { value: command, size: commandSize } = (ctx.string)(buffer, offset + is_blockSize + positionSize + modeSize + needs_redstoneSize + conditionalSize + minecart_entity_runtime_idSize)
      let { value: last_output, size: last_outputSize } = (ctx.string)(buffer, offset + is_blockSize + positionSize + modeSize + needs_redstoneSize + conditionalSize + minecart_entity_runtime_idSize + commandSize)
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset + is_blockSize + positionSize + modeSize + needs_redstoneSize + conditionalSize + minecart_entity_runtime_idSize + commandSize + last_outputSize)
      let { value: should_track_output, size: should_track_outputSize } = (ctx.bool)(buffer, offset + is_blockSize + positionSize + modeSize + needs_redstoneSize + conditionalSize + minecart_entity_runtime_idSize + commandSize + last_outputSize + nameSize)
      let { value: tick_delay, size: tick_delaySize } = (ctx.li32)(buffer, offset + is_blockSize + positionSize + modeSize + needs_redstoneSize + conditionalSize + minecart_entity_runtime_idSize + commandSize + last_outputSize + nameSize + should_track_outputSize)
      let { value: execute_on_first_tick, size: execute_on_first_tickSize } = (ctx.bool)(buffer, offset + is_blockSize + positionSize + modeSize + needs_redstoneSize + conditionalSize + minecart_entity_runtime_idSize + commandSize + last_outputSize + nameSize + should_track_outputSize + tick_delaySize)
      return { value: { is_block, position, mode, needs_redstone, conditional, minecart_entity_runtime_id, command, last_output, name, should_track_output, tick_delay, execute_on_first_tick }, size: is_blockSize + positionSize + modeSize + needs_redstoneSize + conditionalSize + minecart_entity_runtime_idSize + commandSize + last_outputSize + nameSize + should_track_outputSize + tick_delaySize + execute_on_first_tickSize}
    },
    packet_command_output: (buffer, offset) => {
      let { value: origin, size: originSize } = (ctx.CommandOrigin)(buffer, offset)
      let { value: output_type, size: output_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.i8)(buffer, offset)
        return { value: {"1":"last","2":"silent","3":"all","4":"data_set"}[value] || value, size }
      })(buffer, offset + originSize)
      let { value: success_count, size: success_countSize } = (ctx.varint)(buffer, offset + originSize + output_typeSize)
      let { value: output, size: outputSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: success, size: successSize } = (ctx.bool)(buffer, offset)
          let { value: message_id, size: message_idSize } = (ctx.string)(buffer, offset + successSize)
          let { value: parameters1, size: parameters1Size } = ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = (ctx.string)(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset + successSize + message_idSize)
          return { value: { success, message_id, parameters: parameters1 }, size: successSize + message_idSize + parameters1Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + originSize + output_typeSize + success_countSize)
      let { value: data_set, size: data_setSize } = ((buffer, offset) => {
        switch (output_type) {
          case "data_set": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + originSize + output_typeSize + success_countSize + outputSize)
      return { value: { origin, output_type, success_count, output, data_set }, size: originSize + output_typeSize + success_countSize + outputSize + data_setSize}
    },
    packet_update_trade: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: window_type, size: window_typeSize } = (ctx.WindowType)(buffer, offset + window_idSize)
      let { value: size1, size: size1Size } = (ctx.varint)(buffer, offset + window_idSize + window_typeSize)
      let { value: trade_tier, size: trade_tierSize } = (ctx.varint)(buffer, offset + window_idSize + window_typeSize + size1Size)
      let { value: villager_unique_id, size: villager_unique_idSize } = (ctx.varint64)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize)
      let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.varint64)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize)
      let { value: display_name, size: display_nameSize } = (ctx.string)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize)
      let { value: new_trading_ui, size: new_trading_uiSize } = (ctx.bool)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize + display_nameSize)
      let { value: economic_trades, size: economic_tradesSize } = (ctx.bool)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize + display_nameSize + new_trading_uiSize)
      let { value: offers, size: offersSize } = (ctx.nbt)(buffer, offset + window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize + display_nameSize + new_trading_uiSize + economic_tradesSize)
      return { value: { window_id, window_type, size: size1, trade_tier, villager_unique_id, entity_unique_id, display_name, new_trading_ui, economic_trades, offers }, size: window_idSize + window_typeSize + size1Size + trade_tierSize + villager_unique_idSize + entity_unique_idSize + display_nameSize + new_trading_uiSize + economic_tradesSize + offersSize}
    },
    packet_update_equipment: (buffer, offset) => {
      let { value: window_id, size: window_idSize } = (ctx.WindowID)(buffer, offset)
      let { value: window_type, size: window_typeSize } = (ctx.WindowType)(buffer, offset + window_idSize)
      let { value: size1, size: size1Size } = (ctx.u8)(buffer, offset + window_idSize + window_typeSize)
      let { value: entity_id, size: entity_idSize } = (ctx.zigzag64)(buffer, offset + window_idSize + window_typeSize + size1Size)
      let { value: inventory, size: inventorySize } = (ctx.nbt)(buffer, offset + window_idSize + window_typeSize + size1Size + entity_idSize)
      return { value: { window_id, window_type, size: size1, entity_id, inventory }, size: window_idSize + window_typeSize + size1Size + entity_idSize + inventorySize}
    },
    packet_resource_pack_data_info: (buffer, offset) => {
      let { value: pack_id, size: pack_idSize } = (ctx.string)(buffer, offset)
      let { value: max_chunk_size, size: max_chunk_sizeSize } = (ctx.lu32)(buffer, offset + pack_idSize)
      let { value: chunk_count, size: chunk_countSize } = (ctx.lu32)(buffer, offset + pack_idSize + max_chunk_sizeSize)
      let { value: size1, size: size1Size } = (ctx.lu64)(buffer, offset + pack_idSize + max_chunk_sizeSize + chunk_countSize)
      let { value: hash, size: hashSize } = (ctx.ByteArray)(buffer, offset + pack_idSize + max_chunk_sizeSize + chunk_countSize + size1Size)
      let { value: is_premium, size: is_premiumSize } = (ctx.bool)(buffer, offset + pack_idSize + max_chunk_sizeSize + chunk_countSize + size1Size + hashSize)
      let { value: pack_type, size: pack_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"1":"addon","2":"cached","3":"copy_protected","4":"behavior","5":"persona_piece","6":"resources","7":"skins","8":"world_template"}[value] || value, size }
      })(buffer, offset + pack_idSize + max_chunk_sizeSize + chunk_countSize + size1Size + hashSize + is_premiumSize)
      return { value: { pack_id, max_chunk_size, chunk_count, size: size1, hash, is_premium, pack_type }, size: pack_idSize + max_chunk_sizeSize + chunk_countSize + size1Size + hashSize + is_premiumSize + pack_typeSize}
    },
    packet_resource_pack_chunk_data: (buffer, offset) => {
      let { value: pack_id, size: pack_idSize } = (ctx.string)(buffer, offset)
      let { value: chunk_index, size: chunk_indexSize } = (ctx.lu32)(buffer, offset + pack_idSize)
      let { value: progress, size: progressSize } = (ctx.lu64)(buffer, offset + pack_idSize + chunk_indexSize)
      let { value: payload, size: payloadSize } = (ctx.ByteArray)(buffer, offset + pack_idSize + chunk_indexSize + progressSize)
      return { value: { pack_id, chunk_index, progress, payload }, size: pack_idSize + chunk_indexSize + progressSize + payloadSize}
    },
    packet_resource_pack_chunk_request: (buffer, offset) => {
      let { value: pack_id, size: pack_idSize } = (ctx.string)(buffer, offset)
      let { value: chunk_index, size: chunk_indexSize } = (ctx.lu32)(buffer, offset + pack_idSize)
      return { value: { pack_id, chunk_index }, size: pack_idSize + chunk_indexSize}
    },
    packet_transfer: (buffer, offset) => {
      let { value: server_address, size: server_addressSize } = (ctx.string)(buffer, offset)
      let { value: port, size: portSize } = (ctx.lu16)(buffer, offset + server_addressSize)
      return { value: { server_address, port }, size: server_addressSize + portSize}
    },
    packet_play_sound: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset + nameSize)
      let { value: volume, size: volumeSize } = (ctx.lf32)(buffer, offset + nameSize + coordinatesSize)
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset + nameSize + coordinatesSize + volumeSize)
      return { value: { name, coordinates, volume, pitch }, size: nameSize + coordinatesSize + volumeSize + pitchSize}
    },
    packet_stop_sound: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: stop_all, size: stop_allSize } = (ctx.bool)(buffer, offset + nameSize)
      return { value: { name, stop_all }, size: nameSize + stop_allSize}
    },
    packet_set_title: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"clear","1":"reset","2":"set_title","3":"set_subtitle","4":"action_bar_message","5":"set_durations","6":"set_title_json","7":"set_subtitle_json","8":"action_bar_message_json"}[value] || value, size }
      })(buffer, offset)
      let { value: text, size: textSize } = (ctx.string)(buffer, offset + typeSize)
      let { value: fade_in_time, size: fade_in_timeSize } = (ctx.zigzag32)(buffer, offset + typeSize + textSize)
      let { value: stay_time, size: stay_timeSize } = (ctx.zigzag32)(buffer, offset + typeSize + textSize + fade_in_timeSize)
      let { value: fade_out_time, size: fade_out_timeSize } = (ctx.zigzag32)(buffer, offset + typeSize + textSize + fade_in_timeSize + stay_timeSize)
      let { value: xuid, size: xuidSize } = (ctx.string)(buffer, offset + typeSize + textSize + fade_in_timeSize + stay_timeSize + fade_out_timeSize)
      let { value: platform_online_id, size: platform_online_idSize } = (ctx.string)(buffer, offset + typeSize + textSize + fade_in_timeSize + stay_timeSize + fade_out_timeSize + xuidSize)
      return { value: { type, text, fade_in_time, stay_time, fade_out_time, xuid, platform_online_id }, size: typeSize + textSize + fade_in_timeSize + stay_timeSize + fade_out_timeSize + xuidSize + platform_online_idSize}
    },
    packet_add_behavior_tree: (buffer, offset) => {
      let { value: behaviortree, size: behaviortreeSize } = (ctx.string)(buffer, offset)
      return { value: { behaviortree }, size: behaviortreeSize}
    },
    packet_structure_block_update: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: structure_name, size: structure_nameSize } = (ctx.string)(buffer, offset + positionSize)
      let { value: data_field, size: data_fieldSize } = (ctx.string)(buffer, offset + positionSize + structure_nameSize)
      let { value: include_players, size: include_playersSize } = (ctx.bool)(buffer, offset + positionSize + structure_nameSize + data_fieldSize)
      let { value: show_bounding_box, size: show_bounding_boxSize } = (ctx.bool)(buffer, offset + positionSize + structure_nameSize + data_fieldSize + include_playersSize)
      let { value: structure_block_type, size: structure_block_typeSize } = (ctx.zigzag32)(buffer, offset + positionSize + structure_nameSize + data_fieldSize + include_playersSize + show_bounding_boxSize)
      let { value: settings, size: settingsSize } = (ctx.StructureBlockSettings)(buffer, offset + positionSize + structure_nameSize + data_fieldSize + include_playersSize + show_bounding_boxSize + structure_block_typeSize)
      let { value: redstone_save_mode, size: redstone_save_modeSize } = (ctx.zigzag32)(buffer, offset + positionSize + structure_nameSize + data_fieldSize + include_playersSize + show_bounding_boxSize + structure_block_typeSize + settingsSize)
      let { value: should_trigger, size: should_triggerSize } = (ctx.bool)(buffer, offset + positionSize + structure_nameSize + data_fieldSize + include_playersSize + show_bounding_boxSize + structure_block_typeSize + settingsSize + redstone_save_modeSize)
      let { value: water_logged, size: water_loggedSize } = (ctx.bool)(buffer, offset + positionSize + structure_nameSize + data_fieldSize + include_playersSize + show_bounding_boxSize + structure_block_typeSize + settingsSize + redstone_save_modeSize + should_triggerSize)
      return { value: { position, structure_name, data_field, include_players, show_bounding_box, structure_block_type, settings, redstone_save_mode, should_trigger, water_logged }, size: positionSize + structure_nameSize + data_fieldSize + include_playersSize + show_bounding_boxSize + structure_block_typeSize + settingsSize + redstone_save_modeSize + should_triggerSize + water_loggedSize}
    },
    packet_show_store_offer: (buffer, offset) => {
      let { value: offer_id, size: offer_idSize } = (ctx.string)(buffer, offset)
      let { value: show_all, size: show_allSize } = (ctx.bool)(buffer, offset + offer_idSize)
      return { value: { offer_id, show_all }, size: offer_idSize + show_allSize}
    },
    packet_purchase_receipt: (buffer, offset) => {
      let { value: receipts, size: receiptsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { receipts }, size: receiptsSize}
    },
    packet_player_skin: (buffer, offset) => {
      let { value: uuid, size: uuidSize } = (ctx.uuid)(buffer, offset)
      let { value: skin, size: skinSize } = (ctx.Skin)(buffer, offset + uuidSize)
      let { value: skin_name, size: skin_nameSize } = (ctx.string)(buffer, offset + uuidSize + skinSize)
      let { value: old_skin_name, size: old_skin_nameSize } = (ctx.string)(buffer, offset + uuidSize + skinSize + skin_nameSize)
      let { value: is_verified, size: is_verifiedSize } = (ctx.bool)(buffer, offset + uuidSize + skinSize + skin_nameSize + old_skin_nameSize)
      return { value: { uuid, skin, skin_name, old_skin_name, is_verified }, size: uuidSize + skinSize + skin_nameSize + old_skin_nameSize + is_verifiedSize}
    },
    packet_sub_client_login: (buffer, offset) => {
      let { value: tokens, size: tokensSize } = ((buffer, offset) => {
        const payloadSize = (ctx.varint)(buffer, offset)
          const { value, size } = ctx.LoginTokens(buffer, offset + payloadSize.size)
          return { value, size: size + payloadSize.size }
      })(buffer, offset)
      return { value: { tokens }, size: tokensSize}
    },
    packet_initiate_web_socket_connection: (buffer, offset) => {
      let { value: server, size: serverSize } = (ctx.string)(buffer, offset)
      return { value: { server }, size: serverSize}
    },
    packet_set_last_hurt_by: (buffer, offset) => {
      let { value: entity_type, size: entity_typeSize } = (ctx.varint)(buffer, offset)
      return { value: { entity_type }, size: entity_typeSize}
    },
    packet_book_edit: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"replace_page","1":"add_page","2":"delete_page","3":"swap_pages","4":"sign"}[value] || value, size }
      })(buffer, offset)
      let { value: slot, size: slotSize } = (ctx.u8)(buffer, offset + typeSize)
      let { value: page_number, size: page_numberSize } = ((buffer, offset) => {
        switch (type) {
          case "replace_page": return (ctx.u8)(buffer, offset)
          case "add_page": return (ctx.u8)(buffer, offset)
          case "delete_page": return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize)
      let { value: text, size: textSize } = ((buffer, offset) => {
        switch (type) {
          case "replace_page": return (ctx.string)(buffer, offset)
          case "add_page": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize)
      let { value: photo_name, size: photo_nameSize } = ((buffer, offset) => {
        switch (type) {
          case "replace_page": return (ctx.string)(buffer, offset)
          case "add_page": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize)
      let { value: page1, size: page1Size } = ((buffer, offset) => {
        switch (type) {
          case "swap_pages": return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize)
      let { value: page2, size: page2Size } = ((buffer, offset) => {
        switch (type) {
          case "swap_pages": return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size)
      let { value: title, size: titleSize } = ((buffer, offset) => {
        switch (type) {
          case "sign": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size + page2Size)
      let { value: author, size: authorSize } = ((buffer, offset) => {
        switch (type) {
          case "sign": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size + page2Size + titleSize)
      let { value: xuid, size: xuidSize } = ((buffer, offset) => {
        switch (type) {
          case "sign": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size + page2Size + titleSize + authorSize)
      return { value: { type, slot, page_number, text, photo_name, page1, page2, title, author, xuid }, size: typeSize + slotSize + page_numberSize + textSize + photo_nameSize + page1Size + page2Size + titleSize + authorSize + xuidSize}
    },
    packet_npc_request: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: request_type, size: request_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"set_actions","1":"execute_action","2":"execute_closing_commands","3":"set_name","4":"set_skin","5":"set_interaction_text","6":"execute_opening_commands"}[value] || value, size }
      })(buffer, offset + runtime_entity_idSize)
      let { value: command, size: commandSize } = (ctx.string)(buffer, offset + runtime_entity_idSize + request_typeSize)
      let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"set_actions","1":"execute_action","2":"execute_closing_commands","3":"set_name","4":"set_skin","5":"set_interact_text","6":"execute_opening_commands"}[value] || value, size }
      })(buffer, offset + runtime_entity_idSize + request_typeSize + commandSize)
      let { value: scene_name, size: scene_nameSize } = (ctx.string)(buffer, offset + runtime_entity_idSize + request_typeSize + commandSize + action_typeSize)
      return { value: { runtime_entity_id, request_type, command, action_type, scene_name }, size: runtime_entity_idSize + request_typeSize + commandSize + action_typeSize + scene_nameSize}
    },
    packet_photo_transfer: (buffer, offset) => {
      let { value: image_name, size: image_nameSize } = (ctx.string)(buffer, offset)
      let { value: image_data, size: image_dataSize } = (ctx.string)(buffer, offset + image_nameSize)
      let { value: book_id, size: book_idSize } = (ctx.string)(buffer, offset + image_nameSize + image_dataSize)
      let { value: photo_type, size: photo_typeSize } = (ctx.u8)(buffer, offset + image_nameSize + image_dataSize + book_idSize)
      let { value: source_type, size: source_typeSize } = (ctx.u8)(buffer, offset + image_nameSize + image_dataSize + book_idSize + photo_typeSize)
      let { value: owner_entity_unique_id, size: owner_entity_unique_idSize } = (ctx.li64)(buffer, offset + image_nameSize + image_dataSize + book_idSize + photo_typeSize + source_typeSize)
      let { value: new_photo_name, size: new_photo_nameSize } = (ctx.string)(buffer, offset + image_nameSize + image_dataSize + book_idSize + photo_typeSize + source_typeSize + owner_entity_unique_idSize)
      return { value: { image_name, image_data, book_id, photo_type, source_type, owner_entity_unique_id, new_photo_name }, size: image_nameSize + image_dataSize + book_idSize + photo_typeSize + source_typeSize + owner_entity_unique_idSize + new_photo_nameSize}
    },
    packet_modal_form_request: (buffer, offset) => {
      let { value: form_id, size: form_idSize } = (ctx.varint)(buffer, offset)
      let { value: data, size: dataSize } = (ctx.string)(buffer, offset + form_idSize)
      return { value: { form_id, data }, size: form_idSize + dataSize}
    },
    packet_modal_form_response: (buffer, offset) => {
      let { value: form_id, size: form_idSize } = (ctx.varint)(buffer, offset)
      let { value: has_response_data, size: has_response_dataSize } = (ctx.bool)(buffer, offset + form_idSize)
      let { value: data, size: dataSize } = ((buffer, offset) => {
        switch (has_response_data) {
          case true: return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + form_idSize + has_response_dataSize)
      let { value: has_cancel_reason, size: has_cancel_reasonSize } = (ctx.bool)(buffer, offset + form_idSize + has_response_dataSize + dataSize)
      let { value: cancel_reason, size: cancel_reasonSize } = ((buffer, offset) => {
        switch (has_cancel_reason) {
          case true: return ((buffer, offset) => {
            const { value, size } = (ctx.u8)(buffer, offset)
            return { value: {"0":"closed","1":"busy"}[value] || value, size }
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + form_idSize + has_response_dataSize + dataSize + has_cancel_reasonSize)
      return { value: { form_id, has_response_data, data, has_cancel_reason, cancel_reason }, size: form_idSize + has_response_dataSize + dataSize + has_cancel_reasonSize + cancel_reasonSize}
    },
    packet_server_settings_request: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_server_settings_response: (buffer, offset) => {
      let { value: form_id, size: form_idSize } = (ctx.varint)(buffer, offset)
      let { value: data, size: dataSize } = (ctx.string)(buffer, offset + form_idSize)
      return { value: { form_id, data }, size: form_idSize + dataSize}
    },
    packet_show_profile: (buffer, offset) => {
      let { value: xuid, size: xuidSize } = (ctx.string)(buffer, offset)
      return { value: { xuid }, size: xuidSize}
    },
    packet_set_default_game_type: (buffer, offset) => {
      let { value: gamemode, size: gamemodeSize } = (ctx.GameMode)(buffer, offset)
      return { value: { gamemode }, size: gamemodeSize}
    },
    packet_remove_objective: (buffer, offset) => {
      let { value: objective_name, size: objective_nameSize } = (ctx.string)(buffer, offset)
      return { value: { objective_name }, size: objective_nameSize}
    },
    packet_set_display_objective: (buffer, offset) => {
      let { value: display_slot, size: display_slotSize } = (ctx.string)(buffer, offset)
      let { value: objective_name, size: objective_nameSize } = (ctx.string)(buffer, offset + display_slotSize)
      let { value: display_name, size: display_nameSize } = (ctx.string)(buffer, offset + display_slotSize + objective_nameSize)
      let { value: criteria_name, size: criteria_nameSize } = (ctx.string)(buffer, offset + display_slotSize + objective_nameSize + display_nameSize)
      let { value: sort_order, size: sort_orderSize } = (ctx.zigzag32)(buffer, offset + display_slotSize + objective_nameSize + display_nameSize + criteria_nameSize)
      return { value: { display_slot, objective_name, display_name, criteria_name, sort_order }, size: display_slotSize + objective_nameSize + display_nameSize + criteria_nameSize + sort_orderSize}
    },
    packet_set_score: (buffer, offset) => {
      let { value: action, size: actionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"change","1":"remove"}[value] || value, size }
      })(buffer, offset)
      let { value: entries, size: entriesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: scoreboard_id, size: scoreboard_idSize } = (ctx.zigzag64)(buffer, offset)
          let { value: objective_name1, size: objective_name1Size } = (ctx.string)(buffer, offset + scoreboard_idSize)
          let { value: score, size: scoreSize } = (ctx.li32)(buffer, offset + scoreboard_idSize + objective_name1Size)
          let { value: entry_type, size: entry_typeSize } = ((buffer, offset) => {
            switch (action) {
              case "change": return ((buffer, offset) => {
                const { value, size } = (ctx.i8)(buffer, offset)
                return { value: {"1":"player","2":"entity","3":"fake_player"}[value] || value, size }
              })(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + scoreboard_idSize + objective_name1Size + scoreSize)
          let { value: entity_unique_id1, size: entity_unique_id1Size } = ((buffer, offset) => {
            switch (action) {
              case "change": return ((buffer, offset) => {
                switch (entry_type) {
                  case "player": return (ctx.zigzag64)(buffer, offset)
                  case "entity": return (ctx.zigzag64)(buffer, offset)
                  default: return (ctx.void)(buffer, offset)
                }
              })(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + scoreboard_idSize + objective_name1Size + scoreSize + entry_typeSize)
          let { value: custom_name, size: custom_nameSize } = ((buffer, offset) => {
            switch (action) {
              case "change": return ((buffer, offset) => {
                switch (entry_type) {
                  case "fake_player": return (ctx.string)(buffer, offset)
                  default: return (ctx.void)(buffer, offset)
                }
              })(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + scoreboard_idSize + objective_name1Size + scoreSize + entry_typeSize + entity_unique_id1Size)
          return { value: { scoreboard_id, objective_name: objective_name1, score, entry_type, entity_unique_id: entity_unique_id1, custom_name }, size: scoreboard_idSize + objective_name1Size + scoreSize + entry_typeSize + entity_unique_id1Size + custom_nameSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + actionSize)
      return { value: { action, entries }, size: actionSize + entriesSize}
    },
    packet_lab_table: (buffer, offset) => {
      let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"combine","1":"react","2":"reset"}[value] || value, size }
      })(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3i)(buffer, offset + action_typeSize)
      let { value: reaction_type, size: reaction_typeSize } = (ctx.u8)(buffer, offset + action_typeSize + positionSize)
      return { value: { action_type, position, reaction_type }, size: action_typeSize + positionSize + reaction_typeSize}
    },
    packet_update_block_synced: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: block_runtime_id, size: block_runtime_idSize } = (ctx.varint)(buffer, offset + positionSize)
      let { value: flags, size: flagsSize } = (ctx.UpdateBlockFlags)(buffer, offset + positionSize + block_runtime_idSize)
      let { value: layer, size: layerSize } = (ctx.varint)(buffer, offset + positionSize + block_runtime_idSize + flagsSize)
      let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.zigzag64)(buffer, offset + positionSize + block_runtime_idSize + flagsSize + layerSize)
      let { value: transition_type, size: transition_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"entity","1":"create","2":"destroy"}[value] || value, size }
      })(buffer, offset + positionSize + block_runtime_idSize + flagsSize + layerSize + entity_unique_idSize)
      return { value: { position, block_runtime_id, flags, layer, entity_unique_id, transition_type }, size: positionSize + block_runtime_idSize + flagsSize + layerSize + entity_unique_idSize + transition_typeSize}
    },
    packet_move_entity_delta: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: flags, size: flagsSize } = (ctx.DeltaMoveFlags)(buffer, offset + runtime_entity_idSize)
      let { value: x, size: xSize } = ((buffer, offset) => {
        switch (flags.has_x) {
          case true: return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize)
      let { value: y, size: ySize } = ((buffer, offset) => {
        switch (flags.has_y) {
          case true: return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize)
      let { value: z, size: zSize } = ((buffer, offset) => {
        switch (flags.has_z) {
          case true: return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize + ySize)
      let { value: rot_x, size: rot_xSize } = ((buffer, offset) => {
        switch (flags.has_rot_x) {
          case true: return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize + ySize + zSize)
      let { value: rot_y, size: rot_ySize } = ((buffer, offset) => {
        switch (flags.has_rot_y) {
          case true: return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize + ySize + zSize + rot_xSize)
      let { value: rot_z, size: rot_zSize } = ((buffer, offset) => {
        switch (flags.has_rot_z) {
          case true: return (ctx.u8)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + runtime_entity_idSize + flagsSize + xSize + ySize + zSize + rot_xSize + rot_ySize)
      return { value: { runtime_entity_id, flags, x, y, z, rot_x, rot_y, rot_z }, size: runtime_entity_idSize + flagsSize + xSize + ySize + zSize + rot_xSize + rot_ySize + rot_zSize}
    },
    packet_set_scoreboard_identity: (buffer, offset) => {
      let { value: action, size: actionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.i8)(buffer, offset)
        return { value: {"0":"register_identity","1":"clear_identity"}[value] || value, size }
      })(buffer, offset)
      let { value: entries, size: entriesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: scoreboard_id, size: scoreboard_idSize } = (ctx.zigzag64)(buffer, offset)
          let { value: entity_unique_id1, size: entity_unique_id1Size } = ((buffer, offset) => {
            switch (action) {
              case "register_identity": return (ctx.zigzag64)(buffer, offset)
              default: return (ctx.void)(buffer, offset)
            }
          })(buffer, offset + scoreboard_idSize)
          return { value: { scoreboard_id, entity_unique_id: entity_unique_id1 }, size: scoreboard_idSize + entity_unique_id1Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + actionSize)
      return { value: { action, entries }, size: actionSize + entriesSize}
    },
    packet_set_local_player_as_initialized: (buffer, offset) => {
      let { value: runtime_entity_id, size: runtime_entity_idSize } = (ctx.varint64)(buffer, offset)
      return { value: { runtime_entity_id }, size: runtime_entity_idSize}
    },
    packet_update_soft_enum: (buffer, offset) => {
      return { value: {  }, size: 0}
    },
    packet_network_stack_latency: (buffer, offset) => {
      let { value: timestamp, size: timestampSize } = (ctx.lu64)(buffer, offset)
      let { value: needs_response, size: needs_responseSize } = (ctx.u8)(buffer, offset + timestampSize)
      return { value: { timestamp, needs_response }, size: timestampSize + needs_responseSize}
    },
    packet_script_custom_event: (buffer, offset) => {
      let { value: event_name, size: event_nameSize } = (ctx.string)(buffer, offset)
      let { value: event_data, size: event_dataSize } = (ctx.string)(buffer, offset + event_nameSize)
      return { value: { event_name, event_data }, size: event_nameSize + event_dataSize}
    },
    packet_spawn_particle_effect: (buffer, offset) => {
      let { value: dimension, size: dimensionSize } = (ctx.u8)(buffer, offset)
      let { value: entity_id, size: entity_idSize } = (ctx.zigzag64)(buffer, offset + dimensionSize)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + dimensionSize + entity_idSize)
      let { value: particle_name, size: particle_nameSize } = (ctx.string)(buffer, offset + dimensionSize + entity_idSize + positionSize)
      let { value: molang_variables, size: molang_variablesSize } = (ctx.ByteArray)(buffer, offset + dimensionSize + entity_idSize + positionSize + particle_nameSize)
      return { value: { dimension, entity_id, position, particle_name, molang_variables }, size: dimensionSize + entity_idSize + positionSize + particle_nameSize + molang_variablesSize}
    },
    packet_available_entity_identifiers: (buffer, offset) => {
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset)
      return { value: { nbt }, size: nbtSize}
    },
    packet_level_sound_event_v2: (buffer, offset) => {
      let { value: sound_id, size: sound_idSize } = (ctx.u8)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + sound_idSize)
      let { value: block_id, size: block_idSize } = (ctx.zigzag32)(buffer, offset + sound_idSize + positionSize)
      let { value: entity_type, size: entity_typeSize } = (ctx.string)(buffer, offset + sound_idSize + positionSize + block_idSize)
      let { value: is_baby_mob, size: is_baby_mobSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize)
      let { value: is_global, size: is_globalSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize)
      return { value: { sound_id, position, block_id, entity_type, is_baby_mob, is_global }, size: sound_idSize + positionSize + block_idSize + entity_typeSize + is_baby_mobSize + is_globalSize}
    },
    packet_network_chunk_publisher_update: (buffer, offset) => {
      let { value: coordinates, size: coordinatesSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: radius, size: radiusSize } = (ctx.varint)(buffer, offset + coordinatesSize)
      let { value: saved_chunks, size: saved_chunksSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.lu32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: x1, size: x1Size } = (ctx.zigzag32)(buffer, offset)
          let { value: z1, size: z1Size } = (ctx.zigzag32)(buffer, offset + x1Size)
          return { value: { x: x1, z: z1 }, size: x1Size + z1Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + coordinatesSize + radiusSize)
      return { value: { coordinates, radius, saved_chunks }, size: coordinatesSize + radiusSize + saved_chunksSize}
    },
    packet_biome_definition_list: (buffer, offset) => {
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset)
      return { value: { nbt }, size: nbtSize}
    },
    packet_level_sound_event: (buffer, offset) => {
      let { value: sound_id, size: sound_idSize } = (ctx.SoundType)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + sound_idSize)
      let { value: extra_data, size: extra_dataSize } = (ctx.zigzag32)(buffer, offset + sound_idSize + positionSize)
      let { value: entity_type, size: entity_typeSize } = (ctx.string)(buffer, offset + sound_idSize + positionSize + extra_dataSize)
      let { value: is_baby_mob, size: is_baby_mobSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + extra_dataSize + entity_typeSize)
      let { value: is_global, size: is_globalSize } = (ctx.bool)(buffer, offset + sound_idSize + positionSize + extra_dataSize + entity_typeSize + is_baby_mobSize)
      return { value: { sound_id, position, extra_data, entity_type, is_baby_mob, is_global }, size: sound_idSize + positionSize + extra_dataSize + entity_typeSize + is_baby_mobSize + is_globalSize}
    },
    packet_level_event_generic: (buffer, offset) => {
      let { value: event_id, size: event_idSize } = (ctx.varint)(buffer, offset)
      let { value: nbt, size: nbtSize } = (ctx.nbtLoop)(buffer, offset + event_idSize)
      return { value: { event_id, nbt }, size: event_idSize + nbtSize}
    },
    packet_lectern_update: (buffer, offset) => {
      let { value: page, size: pageSize } = (ctx.u8)(buffer, offset)
      let { value: page_count, size: page_countSize } = (ctx.u8)(buffer, offset + pageSize)
      let { value: position, size: positionSize } = (ctx.vec3i)(buffer, offset + pageSize + page_countSize)
      let { value: drop_book, size: drop_bookSize } = (ctx.bool)(buffer, offset + pageSize + page_countSize + positionSize)
      return { value: { page, page_count, position, drop_book }, size: pageSize + page_countSize + positionSize + drop_bookSize}
    },
    packet_video_stream_connect: (buffer, offset) => {
      let { value: server_uri, size: server_uriSize } = (ctx.string)(buffer, offset)
      let { value: frame_send_frequency, size: frame_send_frequencySize } = (ctx.lf32)(buffer, offset + server_uriSize)
      let { value: action, size: actionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"1":"none","2":"close"}[value] || value, size }
      })(buffer, offset + server_uriSize + frame_send_frequencySize)
      let { value: resolution_x, size: resolution_xSize } = (ctx.li32)(buffer, offset + server_uriSize + frame_send_frequencySize + actionSize)
      let { value: resolution_y, size: resolution_ySize } = (ctx.li32)(buffer, offset + server_uriSize + frame_send_frequencySize + actionSize + resolution_xSize)
      return { value: { server_uri, frame_send_frequency, action, resolution_x, resolution_y }, size: server_uriSize + frame_send_frequencySize + actionSize + resolution_xSize + resolution_ySize}
    },
    packet_add_ecs_entity: (buffer, offset) => {
      let { value: network_id, size: network_idSize } = (ctx.varint64)(buffer, offset)
      return { value: { network_id }, size: network_idSize}
    },
    packet_remove_ecs_entity: (buffer, offset) => {
      let { value: network_id, size: network_idSize } = (ctx.varint64)(buffer, offset)
      return { value: { network_id }, size: network_idSize}
    },
    packet_client_cache_status: (buffer, offset) => {
      let { value: enabled, size: enabledSize } = (ctx.bool)(buffer, offset)
      return { value: { enabled }, size: enabledSize}
    },
    packet_on_screen_texture_animation: (buffer, offset) => {
      let { value: animation_type, size: animation_typeSize } = (ctx.lu32)(buffer, offset)
      return { value: { animation_type }, size: animation_typeSize}
    },
    packet_map_create_locked_copy: (buffer, offset) => {
      let { value: original_map_id, size: original_map_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: new_map_id, size: new_map_idSize } = (ctx.zigzag64)(buffer, offset + original_map_idSize)
      return { value: { original_map_id, new_map_id }, size: original_map_idSize + new_map_idSize}
    },
    packet_structure_template_data_export_request: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset + nameSize)
      let { value: settings, size: settingsSize } = (ctx.StructureBlockSettings)(buffer, offset + nameSize + positionSize)
      let { value: request_type, size: request_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"1":"export_from_save","2":"export_from_load","3":"query_saved_structure","4":"import_from_save"}[value] || value, size }
      })(buffer, offset + nameSize + positionSize + settingsSize)
      return { value: { name, position, settings, request_type }, size: nameSize + positionSize + settingsSize + request_typeSize}
    },
    packet_structure_template_data_export_response: (buffer, offset) => {
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset)
      let { value: success, size: successSize } = (ctx.bool)(buffer, offset + nameSize)
      let { value: nbt, size: nbtSize } = ((buffer, offset) => {
        switch (success) {
          case true: return (ctx.nbt)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + nameSize + successSize)
      let { value: response_type, size: response_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"1":"export","2":"query","3":"import"}[value] || value, size }
      })(buffer, offset + nameSize + successSize + nbtSize)
      return { value: { name, success, nbt, response_type }, size: nameSize + successSize + nbtSize + response_typeSize}
    },
    packet_update_block_properties: (buffer, offset) => {
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset)
      return { value: { nbt }, size: nbtSize}
    },
    packet_client_cache_blob_status: (buffer, offset) => {
      let { value: misses, size: missesSize } = (ctx.varint)(buffer, offset)
      let { value: haves, size: havesSize } = (ctx.varint)(buffer, offset + missesSize)
      let { value: missing, size: missingSize } = ((buffer, offset) => {
        const count = misses
        const countSize = 0
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.lu64)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + missesSize + havesSize)
      let { value: have, size: haveSize } = ((buffer, offset) => {
        const count = haves
        const countSize = 0
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.lu64)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + missesSize + havesSize + missingSize)
      return { value: { misses, haves, missing, have }, size: missesSize + havesSize + missingSize + haveSize}
    },
    packet_client_cache_miss_response: (buffer, offset) => {
      let { value: blobs, size: blobsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.Blob)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { blobs }, size: blobsSize}
    },
    packet_education_settings: (buffer, offset) => {
      let { value: CodeBuilderDefaultURI, size: CodeBuilderDefaultURISize } = (ctx.string)(buffer, offset)
      let { value: CodeBuilderTitle, size: CodeBuilderTitleSize } = (ctx.string)(buffer, offset + CodeBuilderDefaultURISize)
      let { value: CanResizeCodeBuilder, size: CanResizeCodeBuilderSize } = (ctx.bool)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize)
      let { value: disable_legacy_title_bar, size: disable_legacy_title_barSize } = (ctx.bool)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize)
      let { value: post_process_filter, size: post_process_filterSize } = (ctx.string)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize)
      let { value: screenshot_border_path, size: screenshot_border_pathSize } = (ctx.string)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize + post_process_filterSize)
      let { value: has_agent_capabilities, size: has_agent_capabilitiesSize } = (ctx.bool)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize + post_process_filterSize + screenshot_border_pathSize)
      let { value: agent_capabilities, size: agent_capabilitiesSize } = ((buffer, offset) => {
        switch (has_agent_capabilities) {
          case true: return ((buffer, offset) => {
            let { value: has, size: hasSize } = (ctx.bool)(buffer, offset)
            let { value: can_modify_blocks, size: can_modify_blocksSize } = (ctx.bool)(buffer, offset + hasSize)
            return { value: { has, can_modify_blocks }, size: hasSize + can_modify_blocksSize}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize + post_process_filterSize + screenshot_border_pathSize + has_agent_capabilitiesSize)
      let { value: HasOverrideURI, size: HasOverrideURISize } = (ctx.bool)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize + post_process_filterSize + screenshot_border_pathSize + has_agent_capabilitiesSize + agent_capabilitiesSize)
      let { value: OverrideURI, size: OverrideURISize } = ((buffer, offset) => {
        switch (HasOverrideURI) {
          case true: return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize + post_process_filterSize + screenshot_border_pathSize + has_agent_capabilitiesSize + agent_capabilitiesSize + HasOverrideURISize)
      let { value: HasQuiz, size: HasQuizSize } = (ctx.bool)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize + post_process_filterSize + screenshot_border_pathSize + has_agent_capabilitiesSize + agent_capabilitiesSize + HasOverrideURISize + OverrideURISize)
      let { value: has_external_link_settings, size: has_external_link_settingsSize } = (ctx.bool)(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize + post_process_filterSize + screenshot_border_pathSize + has_agent_capabilitiesSize + agent_capabilitiesSize + HasOverrideURISize + OverrideURISize + HasQuizSize)
      let { value: external_link_settings, size: external_link_settingsSize } = ((buffer, offset) => {
        switch (has_external_link_settings) {
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize + post_process_filterSize + screenshot_border_pathSize + has_agent_capabilitiesSize + agent_capabilitiesSize + HasOverrideURISize + OverrideURISize + HasQuizSize + has_external_link_settingsSize)
      return { value: { CodeBuilderDefaultURI, CodeBuilderTitle, CanResizeCodeBuilder, disable_legacy_title_bar, post_process_filter, screenshot_border_path, has_agent_capabilities, agent_capabilities, HasOverrideURI, OverrideURI, HasQuiz, has_external_link_settings, external_link_settings }, size: CodeBuilderDefaultURISize + CodeBuilderTitleSize + CanResizeCodeBuilderSize + disable_legacy_title_barSize + post_process_filterSize + screenshot_border_pathSize + has_agent_capabilitiesSize + agent_capabilitiesSize + HasOverrideURISize + OverrideURISize + HasQuizSize + has_external_link_settingsSize + external_link_settingsSize}
    },
    packet_emote: (buffer, offset) => {
      let { value: entity_id, size: entity_idSize } = (ctx.varint64)(buffer, offset)
      let { value: emote_id, size: emote_idSize } = (ctx.string)(buffer, offset + entity_idSize)
      let { value: xuid, size: xuidSize } = (ctx.string)(buffer, offset + entity_idSize + emote_idSize)
      let { value: platform_id, size: platform_idSize } = (ctx.string)(buffer, offset + entity_idSize + emote_idSize + xuidSize)
      let { value: flags, size: flagsSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"1":"server_side","2":"mute_chat"}[value] || value, size }
      })(buffer, offset + entity_idSize + emote_idSize + xuidSize + platform_idSize)
      return { value: { entity_id, emote_id, xuid, platform_id, flags }, size: entity_idSize + emote_idSize + xuidSize + platform_idSize + flagsSize}
    },
    packet_multiplayer_settings: (buffer, offset) => {
      let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"enable_multiplayer","1":"disable_multiplayer","2":"refresh_join_code"}[value] || value, size }
      })(buffer, offset)
      return { value: { action_type }, size: action_typeSize}
    },
    packet_settings_command: (buffer, offset) => {
      let { value: command_line, size: command_lineSize } = (ctx.string)(buffer, offset)
      let { value: suppress_output, size: suppress_outputSize } = (ctx.bool)(buffer, offset + command_lineSize)
      return { value: { command_line, suppress_output }, size: command_lineSize + suppress_outputSize}
    },
    packet_anvil_damage: (buffer, offset) => {
      let { value: damage, size: damageSize } = (ctx.u8)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset + damageSize)
      return { value: { damage, position }, size: damageSize + positionSize}
    },
    packet_completed_using_item: (buffer, offset) => {
      let { value: used_item_id, size: used_item_idSize } = (ctx.li16)(buffer, offset)
      let { value: use_method, size: use_methodSize } = ((buffer, offset) => {
        const { value, size } = (ctx.li32)(buffer, offset)
        return { value: {"0":"equip_armor","1":"eat","2":"attack","3":"consume","4":"throw","5":"shoot","6":"place","7":"fill_bottle","8":"fill_bucket","9":"pour_bucket","10":"use_tool","11":"interact","12":"retrieved","13":"dyed","14":"traded"}[value] || value, size }
      })(buffer, offset + used_item_idSize)
      return { value: { used_item_id, use_method }, size: used_item_idSize + use_methodSize}
    },
    packet_network_settings: (buffer, offset) => {
      let { value: compression_threshold, size: compression_thresholdSize } = (ctx.lu16)(buffer, offset)
      let { value: compression_algorithm, size: compression_algorithmSize } = ((buffer, offset) => {
        const { value, size } = (ctx.lu16)(buffer, offset)
        return { value: {"0":"deflate","1":"snappy"}[value] || value, size }
      })(buffer, offset + compression_thresholdSize)
      let { value: client_throttle, size: client_throttleSize } = (ctx.bool)(buffer, offset + compression_thresholdSize + compression_algorithmSize)
      let { value: client_throttle_threshold, size: client_throttle_thresholdSize } = (ctx.u8)(buffer, offset + compression_thresholdSize + compression_algorithmSize + client_throttleSize)
      let { value: client_throttle_scalar, size: client_throttle_scalarSize } = (ctx.lf32)(buffer, offset + compression_thresholdSize + compression_algorithmSize + client_throttleSize + client_throttle_thresholdSize)
      return { value: { compression_threshold, compression_algorithm, client_throttle, client_throttle_threshold, client_throttle_scalar }, size: compression_thresholdSize + compression_algorithmSize + client_throttleSize + client_throttle_thresholdSize + client_throttle_scalarSize}
    },
    packet_player_auth_input: (buffer, offset) => {
      let { value: pitch, size: pitchSize } = (ctx.lf32)(buffer, offset)
      let { value: yaw, size: yawSize } = (ctx.lf32)(buffer, offset + pitchSize)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + pitchSize + yawSize)
      let { value: move_vector, size: move_vectorSize } = (ctx.vec2f)(buffer, offset + pitchSize + yawSize + positionSize)
      let { value: head_yaw, size: head_yawSize } = (ctx.lf32)(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize)
      let { value: input_data, size: input_dataSize } = (ctx.InputFlag)(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize)
      let { value: input_mode, size: input_modeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"unknown","1":"mouse","2":"touch","3":"game_pad","4":"motion_controller"}[value] || value, size }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize)
      let { value: play_mode, size: play_modeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"normal","1":"teaser","2":"screen","3":"viewer","4":"reality","5":"placement","6":"living_room","7":"exit_level","8":"exit_level_living_room","9":"num_modes"}[value] || value, size }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize)
      let { value: interaction_model, size: interaction_modelSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"touch","1":"crosshair","2":"classic"}[value] || value, size }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize)
      let { value: gaze_direction, size: gaze_directionSize } = ((buffer, offset) => {
        switch (play_mode) {
          case "reality": return (ctx.vec3f)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + interaction_modelSize)
      let { value: tick, size: tickSize } = (ctx.varint64)(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + interaction_modelSize + gaze_directionSize)
      let { value: delta, size: deltaSize } = (ctx.vec3f)(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + interaction_modelSize + gaze_directionSize + tickSize)
      let { value: transaction, size: transactionSize } = ((buffer, offset) => {
        switch (input_data.item_interact) {
          case true: return ((buffer, offset) => {
            let { value: legacy1, size: legacy1Size } = (ctx.TransactionLegacy)(buffer, offset)
            let { value: actions1, size: actions1Size } = (ctx.TransactionActions)(buffer, offset + legacy1Size)
            let { value: data1, size: data1Size } = (ctx.TransactionUseItem)(buffer, offset + legacy1Size + actions1Size)
            return { value: { legacy: legacy1, actions: actions1, data: data1 }, size: legacy1Size + actions1Size + data1Size}
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + interaction_modelSize + gaze_directionSize + tickSize + deltaSize)
      let { value: item_stack_request, size: item_stack_requestSize } = ((buffer, offset) => {
        switch (input_data.item_stack_request) {
          case true: return (ctx.ItemStackRequest)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + interaction_modelSize + gaze_directionSize + tickSize + deltaSize + transactionSize)
      let { value: block_action, size: block_actionSize } = ((buffer, offset) => {
        switch (input_data.block_action) {
          case true: return ((buffer, offset) => {
            const { value: count, size: countSize } = (ctx.zigzag32)(buffer, offset)
            if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
            const data = []
            let size = countSize
            for (let i = 0; i < count; i++) {
              const elem = ((buffer, offset) => {
              let { value: action1, size: action1Size } = (ctx.Action)(buffer, offset)
              let { value: position1, size: position1Size } = ((buffer, offset) => {
                switch (action1) {
                  case "start_break": return (ctx.BlockCoordinates)(buffer, offset)
                  case "abort_break": return (ctx.BlockCoordinates)(buffer, offset)
                  case "crack_break": return (ctx.BlockCoordinates)(buffer, offset)
                  case "predict_break": return (ctx.BlockCoordinates)(buffer, offset)
                  case "continue_break": return (ctx.BlockCoordinates)(buffer, offset)
                  default: return (ctx.void)(buffer, offset)
                }
              })(buffer, offset + action1Size)
              let { value: face1, size: face1Size } = ((buffer, offset) => {
                switch (action1) {
                  case "start_break": return (ctx.zigzag32)(buffer, offset)
                  case "abort_break": return (ctx.zigzag32)(buffer, offset)
                  case "crack_break": return (ctx.zigzag32)(buffer, offset)
                  case "predict_break": return (ctx.zigzag32)(buffer, offset)
                  case "continue_break": return (ctx.zigzag32)(buffer, offset)
                  default: return (ctx.void)(buffer, offset)
                }
              })(buffer, offset + action1Size + position1Size)
              return { value: { action: action1, position: position1, face: face1 }, size: action1Size + position1Size + face1Size}
            })(buffer, offset + size)
              data.push(elem.value)
              size += elem.size
            }
            return { value: data, size }
          })(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + interaction_modelSize + gaze_directionSize + tickSize + deltaSize + transactionSize + item_stack_requestSize)
      let { value: analogue_move_vector, size: analogue_move_vectorSize } = (ctx.vec2f)(buffer, offset + pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + interaction_modelSize + gaze_directionSize + tickSize + deltaSize + transactionSize + item_stack_requestSize + block_actionSize)
      return { value: { pitch, yaw, position, move_vector, head_yaw, input_data, input_mode, play_mode, interaction_model, gaze_direction, tick, delta, transaction, item_stack_request, block_action, analogue_move_vector }, size: pitchSize + yawSize + positionSize + move_vectorSize + head_yawSize + input_dataSize + input_modeSize + play_modeSize + interaction_modelSize + gaze_directionSize + tickSize + deltaSize + transactionSize + item_stack_requestSize + block_actionSize + analogue_move_vectorSize}
    },
    packet_creative_content: (buffer, offset) => {
      let { value: items, size: itemsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: entry_id, size: entry_idSize } = (ctx.varint)(buffer, offset)
          let { value: item1, size: item1Size } = (ctx.ItemLegacy)(buffer, offset + entry_idSize)
          return { value: { entry_id, item: item1 }, size: entry_idSize + item1Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { items }, size: itemsSize}
    },
    packet_player_enchant_options: (buffer, offset) => {
      let { value: options, size: optionsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.EnchantOption)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { options }, size: optionsSize}
    },
    packet_item_stack_request: (buffer, offset) => {
      let { value: requests, size: requestsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.ItemStackRequest)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { requests }, size: requestsSize}
    },
    packet_item_stack_response: (buffer, offset) => {
      let { value: responses, size: responsesSize } = (ctx.ItemStackResponses)(buffer, offset)
      return { value: { responses }, size: responsesSize}
    },
    packet_player_armor_damage: (buffer, offset) => {
      let { value: type, size: typeSize } = (ctx.ArmorDamageType)(buffer, offset)
      let { value: helmet_damage, size: helmet_damageSize } = ((buffer, offset) => {
        switch (type.head) {
          case true: return (ctx.zigzag32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize)
      let { value: chestplate_damage, size: chestplate_damageSize } = ((buffer, offset) => {
        switch (type.chest) {
          case true: return (ctx.zigzag32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + helmet_damageSize)
      let { value: leggings_damage, size: leggings_damageSize } = ((buffer, offset) => {
        switch (type.legs) {
          case true: return (ctx.zigzag32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + helmet_damageSize + chestplate_damageSize)
      let { value: boots_damage, size: boots_damageSize } = ((buffer, offset) => {
        switch (type.feet) {
          case true: return (ctx.zigzag32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + helmet_damageSize + chestplate_damageSize + leggings_damageSize)
      return { value: { type, helmet_damage, chestplate_damage, leggings_damage, boots_damage }, size: typeSize + helmet_damageSize + chestplate_damageSize + leggings_damageSize + boots_damageSize}
    },
    packet_update_player_game_type: (buffer, offset) => {
      let { value: gamemode, size: gamemodeSize } = (ctx.GameMode)(buffer, offset)
      let { value: player_unique_id, size: player_unique_idSize } = (ctx.zigzag64)(buffer, offset + gamemodeSize)
      return { value: { gamemode, player_unique_id }, size: gamemodeSize + player_unique_idSize}
    },
    packet_emote_list: (buffer, offset) => {
      let { value: player_id, size: player_idSize } = (ctx.varint64)(buffer, offset)
      let { value: emote_pieces, size: emote_piecesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.uuid)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + player_idSize)
      return { value: { player_id, emote_pieces }, size: player_idSize + emote_piecesSize}
    },
    packet_position_tracking_db_request: (buffer, offset) => {
      let { value: action, size: actionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"query"}[value] || value, size }
      })(buffer, offset)
      let { value: tracking_id, size: tracking_idSize } = (ctx.zigzag32)(buffer, offset + actionSize)
      return { value: { action, tracking_id }, size: actionSize + tracking_idSize}
    },
    packet_position_tracking_db_broadcast: (buffer, offset) => {
      let { value: broadcast_action, size: broadcast_actionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"update","1":"destory","2":"not_found"}[value] || value, size }
      })(buffer, offset)
      let { value: tracking_id, size: tracking_idSize } = (ctx.zigzag32)(buffer, offset + broadcast_actionSize)
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset + broadcast_actionSize + tracking_idSize)
      return { value: { broadcast_action, tracking_id, nbt }, size: broadcast_actionSize + tracking_idSize + nbtSize}
    },
    packet_packet_violation_warning: (buffer, offset) => {
      let { value: violation_type, size: violation_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"malformed"}[value] || value, size }
      })(buffer, offset)
      let { value: severity, size: severitySize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"warning","1":"final_warning","2":"terminating"}[value] || value, size }
      })(buffer, offset + violation_typeSize)
      let { value: packet_id, size: packet_idSize } = (ctx.zigzag32)(buffer, offset + violation_typeSize + severitySize)
      let { value: reason, size: reasonSize } = (ctx.string)(buffer, offset + violation_typeSize + severitySize + packet_idSize)
      return { value: { violation_type, severity, packet_id, reason }, size: violation_typeSize + severitySize + packet_idSize + reasonSize}
    },
    packet_motion_prediction_hints: (buffer, offset) => {
      let { value: entity_runtime_id, size: entity_runtime_idSize } = (ctx.varint64)(buffer, offset)
      let { value: velocity, size: velocitySize } = (ctx.vec3f)(buffer, offset + entity_runtime_idSize)
      let { value: on_ground, size: on_groundSize } = (ctx.bool)(buffer, offset + entity_runtime_idSize + velocitySize)
      return { value: { entity_runtime_id, velocity, on_ground }, size: entity_runtime_idSize + velocitySize + on_groundSize}
    },
    packet_animate_entity: (buffer, offset) => {
      let { value: animation, size: animationSize } = (ctx.string)(buffer, offset)
      let { value: next_state, size: next_stateSize } = (ctx.string)(buffer, offset + animationSize)
      let { value: stop_condition, size: stop_conditionSize } = (ctx.string)(buffer, offset + animationSize + next_stateSize)
      let { value: stop_condition_version, size: stop_condition_versionSize } = (ctx.li32)(buffer, offset + animationSize + next_stateSize + stop_conditionSize)
      let { value: controller, size: controllerSize } = (ctx.string)(buffer, offset + animationSize + next_stateSize + stop_conditionSize + stop_condition_versionSize)
      let { value: blend_out_time, size: blend_out_timeSize } = (ctx.lf32)(buffer, offset + animationSize + next_stateSize + stop_conditionSize + stop_condition_versionSize + controllerSize)
      let { value: runtime_entity_ids, size: runtime_entity_idsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.varint64)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + animationSize + next_stateSize + stop_conditionSize + stop_condition_versionSize + controllerSize + blend_out_timeSize)
      return { value: { animation, next_state, stop_condition, stop_condition_version, controller, blend_out_time, runtime_entity_ids }, size: animationSize + next_stateSize + stop_conditionSize + stop_condition_versionSize + controllerSize + blend_out_timeSize + runtime_entity_idsSize}
    },
    packet_camera_shake: (buffer, offset) => {
      let { value: intensity, size: intensitySize } = (ctx.lf32)(buffer, offset)
      let { value: duration, size: durationSize } = (ctx.lf32)(buffer, offset + intensitySize)
      let { value: type, size: typeSize } = (ctx.u8)(buffer, offset + intensitySize + durationSize)
      let { value: action, size: actionSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"add","1":"stop"}[value] || value, size }
      })(buffer, offset + intensitySize + durationSize + typeSize)
      return { value: { intensity, duration, type, action }, size: intensitySize + durationSize + typeSize + actionSize}
    },
    packet_player_fog: (buffer, offset) => {
      let { value: stack, size: stackSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { stack }, size: stackSize}
    },
    packet_correct_player_move_prediction: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset)
      let { value: delta, size: deltaSize } = (ctx.vec3f)(buffer, offset + positionSize)
      let { value: on_ground, size: on_groundSize } = (ctx.bool)(buffer, offset + positionSize + deltaSize)
      let { value: tick, size: tickSize } = (ctx.varint64)(buffer, offset + positionSize + deltaSize + on_groundSize)
      return { value: { position, delta, on_ground, tick }, size: positionSize + deltaSize + on_groundSize + tickSize}
    },
    packet_item_component: (buffer, offset) => {
      let { value: entries, size: entriesSize } = (ctx.ItemComponentList)(buffer, offset)
      return { value: { entries }, size: entriesSize}
    },
    packet_filter_text_packet: (buffer, offset) => {
      let { value: text, size: textSize } = (ctx.string)(buffer, offset)
      let { value: from_server, size: from_serverSize } = (ctx.bool)(buffer, offset + textSize)
      return { value: { text, from_server }, size: textSize + from_serverSize}
    },
    packet_debug_renderer: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.li32)(buffer, offset)
        return { value: {"1":"clear","2":"add_cube"}[value] || value, size }
      })(buffer, offset)
      let { value: text, size: textSize } = ((buffer, offset) => {
        switch (type) {
          case "clear": return (ctx.void)(buffer, offset)
          case "add_cube": return (ctx.string)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize)
      let { value: position, size: positionSize } = ((buffer, offset) => {
        switch (type) {
          case "clear": return (ctx.void)(buffer, offset)
          case "add_cube": return (ctx.vec3f)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + textSize)
      let { value: red, size: redSize } = ((buffer, offset) => {
        switch (type) {
          case "clear": return (ctx.void)(buffer, offset)
          case "add_cube": return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + textSize + positionSize)
      let { value: green, size: greenSize } = ((buffer, offset) => {
        switch (type) {
          case "clear": return (ctx.void)(buffer, offset)
          case "add_cube": return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + textSize + positionSize + redSize)
      let { value: blue, size: blueSize } = ((buffer, offset) => {
        switch (type) {
          case "clear": return (ctx.void)(buffer, offset)
          case "add_cube": return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + textSize + positionSize + redSize + greenSize)
      let { value: alpha, size: alphaSize } = ((buffer, offset) => {
        switch (type) {
          case "clear": return (ctx.void)(buffer, offset)
          case "add_cube": return (ctx.lf32)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + textSize + positionSize + redSize + greenSize + blueSize)
      let { value: duration, size: durationSize } = ((buffer, offset) => {
        switch (type) {
          case "clear": return (ctx.void)(buffer, offset)
          case "add_cube": return (ctx.li64)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + typeSize + textSize + positionSize + redSize + greenSize + blueSize + alphaSize)
      return { value: { type, text, position, red, green, blue, alpha, duration }, size: typeSize + textSize + positionSize + redSize + greenSize + blueSize + alphaSize + durationSize}
    },
    packet_sync_entity_property: (buffer, offset) => {
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset)
      return { value: { nbt }, size: nbtSize}
    },
    packet_add_volume_entity: (buffer, offset) => {
      let { value: runtime_id, size: runtime_idSize } = (ctx.varint64)(buffer, offset)
      let { value: nbt, size: nbtSize } = (ctx.nbt)(buffer, offset + runtime_idSize)
      let { value: encoding_identifier, size: encoding_identifierSize } = (ctx.string)(buffer, offset + runtime_idSize + nbtSize)
      let { value: instance_name, size: instance_nameSize } = (ctx.string)(buffer, offset + runtime_idSize + nbtSize + encoding_identifierSize)
      let { value: bounds, size: boundsSize } = ((buffer, offset) => {
        let { value: min, size: minSize } = (ctx.BlockCoordinates)(buffer, offset)
        let { value: max, size: maxSize } = (ctx.BlockCoordinates)(buffer, offset + minSize)
        return { value: { min, max }, size: minSize + maxSize}
      })(buffer, offset + runtime_idSize + nbtSize + encoding_identifierSize + instance_nameSize)
      let { value: dimension, size: dimensionSize } = (ctx.zigzag32)(buffer, offset + runtime_idSize + nbtSize + encoding_identifierSize + instance_nameSize + boundsSize)
      let { value: engine_version, size: engine_versionSize } = (ctx.string)(buffer, offset + runtime_idSize + nbtSize + encoding_identifierSize + instance_nameSize + boundsSize + dimensionSize)
      return { value: { runtime_id, nbt, encoding_identifier, instance_name, bounds, dimension, engine_version }, size: runtime_idSize + nbtSize + encoding_identifierSize + instance_nameSize + boundsSize + dimensionSize + engine_versionSize}
    },
    packet_remove_volume_entity: (buffer, offset) => {
      let { value: entity_id, size: entity_idSize } = (ctx.varint64)(buffer, offset)
      return { value: { entity_id }, size: entity_idSize}
    },
    packet_simulation_type: (buffer, offset) => {
      let { value: type, size: typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"game","1":"editor","2":"test","3":"invalid"}[value] || value, size }
      })(buffer, offset)
      return { value: { type }, size: typeSize}
    },
    packet_npc_dialogue: (buffer, offset) => {
      let { value: entity_id, size: entity_idSize } = (ctx.lu64)(buffer, offset)
      let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.varint)(buffer, offset)
        return { value: {"0":"open","1":"close"}[value] || value, size }
      })(buffer, offset + entity_idSize)
      let { value: dialogue, size: dialogueSize } = (ctx.string)(buffer, offset + entity_idSize + action_typeSize)
      let { value: screen_name, size: screen_nameSize } = (ctx.string)(buffer, offset + entity_idSize + action_typeSize + dialogueSize)
      let { value: npc_name, size: npc_nameSize } = (ctx.string)(buffer, offset + entity_idSize + action_typeSize + dialogueSize + screen_nameSize)
      let { value: action_json, size: action_jsonSize } = (ctx.string)(buffer, offset + entity_idSize + action_typeSize + dialogueSize + screen_nameSize + npc_nameSize)
      return { value: { entity_id, action_type, dialogue, screen_name, npc_name, action_json }, size: entity_idSize + action_typeSize + dialogueSize + screen_nameSize + npc_nameSize + action_jsonSize}
    },
    packet_edu_uri_resource_packet: (buffer, offset) => {
      let { value: resource, size: resourceSize } = (ctx.EducationSharedResourceURI)(buffer, offset)
      return { value: { resource }, size: resourceSize}
    },
    packet_create_photo: (buffer, offset) => {
      let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.li64)(buffer, offset)
      let { value: photo_name, size: photo_nameSize } = (ctx.string)(buffer, offset + entity_unique_idSize)
      let { value: item_name, size: item_nameSize } = (ctx.string)(buffer, offset + entity_unique_idSize + photo_nameSize)
      return { value: { entity_unique_id, photo_name, item_name }, size: entity_unique_idSize + photo_nameSize + item_nameSize}
    },
    packet_update_subchunk_blocks: (buffer, offset) => {
      let { value: x, size: xSize } = (ctx.zigzag32)(buffer, offset)
      let { value: y, size: ySize } = (ctx.zigzag32)(buffer, offset + xSize)
      let { value: z, size: zSize } = (ctx.zigzag32)(buffer, offset + xSize + ySize)
      let { value: blocks, size: blocksSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.BlockUpdate)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + xSize + ySize + zSize)
      let { value: extra, size: extraSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.BlockUpdate)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + xSize + ySize + zSize + blocksSize)
      return { value: { x, y, z, blocks, extra }, size: xSize + ySize + zSize + blocksSize + extraSize}
    },
    packet_photo_info_request: (buffer, offset) => {
      let { value: photo_id, size: photo_idSize } = (ctx.zigzag64)(buffer, offset)
      return { value: { photo_id }, size: photo_idSize}
    },
    SubChunkEntryWithoutCaching: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.lu32)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: dx, size: dxSize } = (ctx.i8)(buffer, offset)
        let { value: dy, size: dySize } = (ctx.i8)(buffer, offset + dxSize)
        let { value: dz, size: dzSize } = (ctx.i8)(buffer, offset + dxSize + dySize)
        let { value: result1, size: result1Size } = ((buffer, offset) => {
          const { value, size } = (ctx.u8)(buffer, offset)
          return { value: {"0":"undefined","1":"success","2":"chunk_not_found","3":"invalid_dimension","4":"player_not_found","5":"y_index_out_of_bounds","6":"success_all_air"}[value] || value, size }
        })(buffer, offset + dxSize + dySize + dzSize)
        let { value: payload1, size: payload1Size } = (ctx.ByteArray)(buffer, offset + dxSize + dySize + dzSize + result1Size)
        let { value: heightmap_type, size: heightmap_typeSize } = ((buffer, offset) => {
          const { value, size } = (ctx.u8)(buffer, offset)
          return { value: {"0":"no_data","1":"has_data","2":"too_high","3":"too_low"}[value] || value, size }
        })(buffer, offset + dxSize + dySize + dzSize + result1Size + payload1Size)
        let { value: heightmap, size: heightmapSize } = ((buffer, offset) => {
          switch (heightmap_type) {
            case "has_data": return ((buffer, offset) => {
              const count = 256
              const countSize = 0
              offset += countSize
              if (offset + count > buffer.length) {
                throw new PartialReadError()
              }
              return { value: buffer.slice(offset, offset + count), size: count + countSize }
            })(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + dxSize + dySize + dzSize + result1Size + payload1Size + heightmap_typeSize)
        return { value: { dx, dy, dz, result: result1, payload: payload1, heightmap_type, heightmap }, size: dxSize + dySize + dzSize + result1Size + payload1Size + heightmap_typeSize + heightmapSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    SubChunkEntryWithCaching: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.lu32)(buffer, offset)
      if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
      const data = []
      let size = countSize
      for (let i = 0; i < count; i++) {
        const elem = ((buffer, offset) => {
        let { value: dx, size: dxSize } = (ctx.i8)(buffer, offset)
        let { value: dy, size: dySize } = (ctx.i8)(buffer, offset + dxSize)
        let { value: dz, size: dzSize } = (ctx.i8)(buffer, offset + dxSize + dySize)
        let { value: result1, size: result1Size } = ((buffer, offset) => {
          const { value, size } = (ctx.u8)(buffer, offset)
          return { value: {"0":"undefined","1":"success","2":"chunk_not_found","3":"invalid_dimension","4":"player_not_found","5":"y_index_out_of_bounds","6":"success_all_air"}[value] || value, size }
        })(buffer, offset + dxSize + dySize + dzSize)
        let { value: payload1, size: payload1Size } = ((buffer, offset) => {
          switch (result1) {
            case "success_all_air": return (ctx.void)(buffer, offset)
            default: return (ctx.ByteArray)(buffer, offset)
          }
        })(buffer, offset + dxSize + dySize + dzSize + result1Size)
        let { value: heightmap_type, size: heightmap_typeSize } = ((buffer, offset) => {
          const { value, size } = (ctx.u8)(buffer, offset)
          return { value: {"0":"no_data","1":"has_data","2":"too_high","3":"too_low"}[value] || value, size }
        })(buffer, offset + dxSize + dySize + dzSize + result1Size + payload1Size)
        let { value: heightmap, size: heightmapSize } = ((buffer, offset) => {
          switch (heightmap_type) {
            case "has_data": return ((buffer, offset) => {
              const count = 256
              const countSize = 0
              offset += countSize
              if (offset + count > buffer.length) {
                throw new PartialReadError()
              }
              return { value: buffer.slice(offset, offset + count), size: count + countSize }
            })(buffer, offset)
            default: return (ctx.void)(buffer, offset)
          }
        })(buffer, offset + dxSize + dySize + dzSize + result1Size + payload1Size + heightmap_typeSize)
        let { value: blob_id, size: blob_idSize } = (ctx.lu64)(buffer, offset + dxSize + dySize + dzSize + result1Size + payload1Size + heightmap_typeSize + heightmapSize)
        return { value: { dx, dy, dz, result: result1, payload: payload1, heightmap_type, heightmap, blob_id }, size: dxSize + dySize + dzSize + result1Size + payload1Size + heightmap_typeSize + heightmapSize + blob_idSize}
      })(buffer, offset + size)
        data.push(elem.value)
        size += elem.size
      }
      return { value: data, size }
    },
    packet_subchunk: (buffer, offset) => {
      let { value: cache_enabled, size: cache_enabledSize } = (ctx.bool)(buffer, offset)
      let { value: dimension, size: dimensionSize } = (ctx.zigzag32)(buffer, offset + cache_enabledSize)
      let { value: origin, size: originSize } = (ctx.vec3i)(buffer, offset + cache_enabledSize + dimensionSize)
      let { value: entries, size: entriesSize } = ((buffer, offset) => {
        switch (cache_enabled) {
          case true: return (ctx.SubChunkEntryWithCaching)(buffer, offset)
          case false: return (ctx.SubChunkEntryWithoutCaching)(buffer, offset)
          default: return (ctx.void)(buffer, offset)
        }
      })(buffer, offset + cache_enabledSize + dimensionSize + originSize)
      return { value: { cache_enabled, dimension, origin, entries }, size: cache_enabledSize + dimensionSize + originSize + entriesSize}
    },
    packet_subchunk_request: (buffer, offset) => {
      let { value: dimension, size: dimensionSize } = (ctx.zigzag32)(buffer, offset)
      let { value: origin, size: originSize } = (ctx.vec3i)(buffer, offset + dimensionSize)
      let { value: requests, size: requestsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.lu32)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: dx, size: dxSize } = (ctx.i8)(buffer, offset)
          let { value: dy, size: dySize } = (ctx.i8)(buffer, offset + dxSize)
          let { value: dz, size: dzSize } = (ctx.i8)(buffer, offset + dxSize + dySize)
          return { value: { dx, dy, dz }, size: dxSize + dySize + dzSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + dimensionSize + originSize)
      return { value: { dimension, origin, requests }, size: dimensionSize + originSize + requestsSize}
    },
    packet_client_start_item_cooldown: (buffer, offset) => {
      let { value: category, size: categorySize } = (ctx.string)(buffer, offset)
      let { value: duration, size: durationSize } = (ctx.zigzag32)(buffer, offset + categorySize)
      return { value: { category, duration }, size: categorySize + durationSize}
    },
    packet_script_message: (buffer, offset) => {
      let { value: message_id, size: message_idSize } = (ctx.string)(buffer, offset)
      let { value: data, size: dataSize } = (ctx.string)(buffer, offset + message_idSize)
      return { value: { message_id, data }, size: message_idSize + dataSize}
    },
    packet_code_builder_source: (buffer, offset) => {
      let { value: operation, size: operationSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"none","1":"get","2":"set","3":"reset"}[value] || value, size }
      })(buffer, offset)
      let { value: category, size: categorySize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"none","1":"code_status","2":"instantiation"}[value] || value, size }
      })(buffer, offset + operationSize)
      let { value: value1, size: value1Size } = (ctx.string)(buffer, offset + operationSize + categorySize)
      return { value: { operation, category, value: value1 }, size: operationSize + categorySize + value1Size}
    },
    packet_ticking_areas_load_status: (buffer, offset) => {
      let { value: preload, size: preloadSize } = (ctx.bool)(buffer, offset)
      return { value: { preload }, size: preloadSize}
    },
    packet_dimension_data: (buffer, offset) => {
      let { value: definitions, size: definitionsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: id1, size: id1Size } = (ctx.string)(buffer, offset)
          let { value: max_height, size: max_heightSize } = (ctx.zigzag32)(buffer, offset + id1Size)
          let { value: min_height, size: min_heightSize } = (ctx.zigzag32)(buffer, offset + id1Size + max_heightSize)
          let { value: generator1, size: generator1Size } = ((buffer, offset) => {
            const { value, size } = (ctx.zigzag32)(buffer, offset)
            return { value: {"0":"legacy","1":"overworld","2":"flat","3":"nether","4":"end","5":"void"}[value] || value, size }
          })(buffer, offset + id1Size + max_heightSize + min_heightSize)
          return { value: { id: id1, max_height, min_height, generator: generator1 }, size: id1Size + max_heightSize + min_heightSize + generator1Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { definitions }, size: definitionsSize}
    },
    packet_agent_action: (buffer, offset) => {
      let { value: request_id, size: request_idSize } = (ctx.string)(buffer, offset)
      let { value: action_type, size: action_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"none","1":"attack","2":"collect","3":"destroy","4":"detect_redstone","5":"detect_obstacle","6":"drop","7":"drop_all","8":"inspect","9":"inspect_data","10":"inspect_item_count","11":"inspect_item_detail","12":"inspect_item_space","13":"interact","14":"move","15":"place_block","16":"till","17":"transfer_item_to","18":"turn"}[value] || value, size }
      })(buffer, offset + request_idSize)
      let { value: body, size: bodySize } = (ctx.string)(buffer, offset + request_idSize + action_typeSize)
      return { value: { request_id, action_type, body }, size: request_idSize + action_typeSize + bodySize}
    },
    packet_change_mob_property: (buffer, offset) => {
      let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.zigzag64)(buffer, offset)
      let { value: property, size: propertySize } = (ctx.string)(buffer, offset + entity_unique_idSize)
      let { value: bool_value, size: bool_valueSize } = (ctx.bool)(buffer, offset + entity_unique_idSize + propertySize)
      let { value: string_value, size: string_valueSize } = (ctx.string)(buffer, offset + entity_unique_idSize + propertySize + bool_valueSize)
      let { value: int_value, size: int_valueSize } = (ctx.zigzag32)(buffer, offset + entity_unique_idSize + propertySize + bool_valueSize + string_valueSize)
      let { value: float_value, size: float_valueSize } = (ctx.lf32)(buffer, offset + entity_unique_idSize + propertySize + bool_valueSize + string_valueSize + int_valueSize)
      return { value: { entity_unique_id, property, bool_value, string_value, int_value, float_value }, size: entity_unique_idSize + propertySize + bool_valueSize + string_valueSize + int_valueSize + float_valueSize}
    },
    packet_lesson_progress: (buffer, offset) => {
      let { value: action, size: actionSize } = (ctx.u8)(buffer, offset)
      let { value: score, size: scoreSize } = (ctx.zigzag32)(buffer, offset + actionSize)
      let { value: identifier, size: identifierSize } = (ctx.string)(buffer, offset + actionSize + scoreSize)
      return { value: { action, score, identifier }, size: actionSize + scoreSize + identifierSize}
    },
    packet_request_ability: (buffer, offset) => {
      let { value: ability, size: abilitySize } = ((buffer, offset) => {
        const { value, size } = (ctx.zigzag32)(buffer, offset)
        return { value: {"0":"build","1":"mine","2":"doors_and_switches","3":"open_containers","4":"attack_players","5":"attack_mobs","6":"operator_commands","7":"teleport","8":"invulnerable","9":"flying","10":"may_fly","11":"instant_build","12":"lightning","13":"fly_speed","14":"walk_speed","15":"muted","16":"world_builder","17":"no_clip","18":"ability_count"}[value] || value, size }
      })(buffer, offset)
      let { value: value_type, size: value_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"1":"bool","2":"float"}[value] || value, size }
      })(buffer, offset + abilitySize)
      let { value: bool_value, size: bool_valueSize } = (ctx.bool)(buffer, offset + abilitySize + value_typeSize)
      let { value: float_val, size: float_valSize } = (ctx.lf32)(buffer, offset + abilitySize + value_typeSize + bool_valueSize)
      return { value: { ability, value_type, bool_value, float_val }, size: abilitySize + value_typeSize + bool_valueSize + float_valSize}
    },
    packet_request_permissions: (buffer, offset) => {
      let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.li64)(buffer, offset)
      let { value: permission_level, size: permission_levelSize } = (ctx.PermissionLevel)(buffer, offset + entity_unique_idSize)
      let { value: requested_permissions, size: requested_permissionsSize } = (ctx.RequestPermissions)(buffer, offset + entity_unique_idSize + permission_levelSize)
      return { value: { entity_unique_id, permission_level, requested_permissions }, size: entity_unique_idSize + permission_levelSize + requested_permissionsSize}
    },
    packet_toast_request: (buffer, offset) => {
      let { value: title, size: titleSize } = (ctx.string)(buffer, offset)
      let { value: message, size: messageSize } = (ctx.string)(buffer, offset + titleSize)
      return { value: { title, message }, size: titleSize + messageSize}
    },
    packet_update_abilities: (buffer, offset) => {
      let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.li64)(buffer, offset)
      let { value: permission_level, size: permission_levelSize } = (ctx.PermissionLevel)(buffer, offset + entity_unique_idSize)
      let { value: command_permission, size: command_permissionSize } = (ctx.CommandPermissionLevel)(buffer, offset + entity_unique_idSize + permission_levelSize)
      let { value: abilities, size: abilitiesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.u8)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.AbilityLayers)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + entity_unique_idSize + permission_levelSize + command_permissionSize)
      return { value: { entity_unique_id, permission_level, command_permission, abilities }, size: entity_unique_idSize + permission_levelSize + command_permissionSize + abilitiesSize}
    },
    packet_update_adventure_settings: (buffer, offset) => {
      let { value: no_pvm, size: no_pvmSize } = (ctx.bool)(buffer, offset)
      let { value: no_mvp, size: no_mvpSize } = (ctx.bool)(buffer, offset + no_pvmSize)
      let { value: immutable_world, size: immutable_worldSize } = (ctx.bool)(buffer, offset + no_pvmSize + no_mvpSize)
      let { value: show_name_tags, size: show_name_tagsSize } = (ctx.bool)(buffer, offset + no_pvmSize + no_mvpSize + immutable_worldSize)
      let { value: auto_jump, size: auto_jumpSize } = (ctx.bool)(buffer, offset + no_pvmSize + no_mvpSize + immutable_worldSize + show_name_tagsSize)
      return { value: { no_pvm, no_mvp, immutable_world, show_name_tags, auto_jump }, size: no_pvmSize + no_mvpSize + immutable_worldSize + show_name_tagsSize + auto_jumpSize}
    },
    packet_death_info: (buffer, offset) => {
      let { value: cause, size: causeSize } = (ctx.string)(buffer, offset)
      let { value: messages, size: messagesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + causeSize)
      return { value: { cause, messages }, size: causeSize + messagesSize}
    },
    packet_editor_network: (buffer, offset) => {
      let { value: payload, size: payloadSize } = (ctx.nbt)(buffer, offset)
      return { value: { payload }, size: payloadSize}
    },
    packet_feature_registry: (buffer, offset) => {
      let { value: features, size: featuresSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: name1, size: name1Size } = (ctx.string)(buffer, offset)
          let { value: options1, size: options1Size } = (ctx.string)(buffer, offset + name1Size)
          return { value: { name: name1, options: options1 }, size: name1Size + options1Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      return { value: { features }, size: featuresSize}
    },
    packet_server_stats: (buffer, offset) => {
      let { value: server_time, size: server_timeSize } = (ctx.lf32)(buffer, offset)
      let { value: network_time, size: network_timeSize } = (ctx.lf32)(buffer, offset + server_timeSize)
      return { value: { server_time, network_time }, size: server_timeSize + network_timeSize}
    },
    packet_request_network_settings: (buffer, offset) => {
      let { value: client_protocol, size: client_protocolSize } = (ctx.i32)(buffer, offset)
      return { value: { client_protocol }, size: client_protocolSize}
    },
    packet_game_test_request: (buffer, offset) => {
      let { value: max_tests_per_batch, size: max_tests_per_batchSize } = (ctx.varint)(buffer, offset)
      let { value: repetitions, size: repetitionsSize } = (ctx.varint)(buffer, offset + max_tests_per_batchSize)
      let { value: rotation, size: rotationSize } = ((buffer, offset) => {
        const { value, size } = (ctx.u8)(buffer, offset)
        return { value: {"0":"0deg","1":"90deg","2":"180deg","3":"270deg","4":"360deg"}[value] || value, size }
      })(buffer, offset + max_tests_per_batchSize + repetitionsSize)
      let { value: stop_on_error, size: stop_on_errorSize } = (ctx.bool)(buffer, offset + max_tests_per_batchSize + repetitionsSize + rotationSize)
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset + max_tests_per_batchSize + repetitionsSize + rotationSize + stop_on_errorSize)
      let { value: tests_per_row, size: tests_per_rowSize } = (ctx.varint)(buffer, offset + max_tests_per_batchSize + repetitionsSize + rotationSize + stop_on_errorSize + positionSize)
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset + max_tests_per_batchSize + repetitionsSize + rotationSize + stop_on_errorSize + positionSize + tests_per_rowSize)
      return { value: { max_tests_per_batch, repetitions, rotation, stop_on_error, position, tests_per_row, name }, size: max_tests_per_batchSize + repetitionsSize + rotationSize + stop_on_errorSize + positionSize + tests_per_rowSize + nameSize}
    },
    packet_game_test_results: (buffer, offset) => {
      let { value: succeeded, size: succeededSize } = (ctx.bool)(buffer, offset)
      let { value: error, size: errorSize } = (ctx.string)(buffer, offset + succeededSize)
      let { value: name, size: nameSize } = (ctx.string)(buffer, offset + succeededSize + errorSize)
      return { value: { succeeded, error, name }, size: succeededSize + errorSize + nameSize}
    },
    packet_update_client_input_locks: (buffer, offset) => {
      let { value: locks, size: locksSize } = (ctx.InputLockFlags)(buffer, offset)
      let { value: position, size: positionSize } = (ctx.vec3f)(buffer, offset + locksSize)
      return { value: { locks, position }, size: locksSize + positionSize}
    },
    packet_client_cheat_ability: (buffer, offset) => {
      let { value: entity_unique_id, size: entity_unique_idSize } = (ctx.li64)(buffer, offset)
      let { value: permission_level, size: permission_levelSize } = (ctx.PermissionLevel)(buffer, offset + entity_unique_idSize)
      let { value: command_permission, size: command_permissionSize } = (ctx.CommandPermissionLevel)(buffer, offset + entity_unique_idSize + permission_levelSize)
      let { value: abilities, size: abilitiesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.u8)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.AbilityLayers)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + entity_unique_idSize + permission_levelSize + command_permissionSize)
      return { value: { entity_unique_id, permission_level, command_permission, abilities }, size: entity_unique_idSize + permission_levelSize + command_permissionSize + abilitiesSize}
    },
    packet_camera_presets: (buffer, offset) => {
      let { value: data, size: dataSize } = (ctx.nbt)(buffer, offset)
      return { value: { data }, size: dataSize}
    },
    packet_unlocked_recipes: (buffer, offset) => {
      let { value: unlock_type, size: unlock_typeSize } = ((buffer, offset) => {
        const { value, size } = (ctx.lu32)(buffer, offset)
        return { value: {"0":"empty","1":"initially_unlocked","2":"newly_unlocked","3":"remove_unlocked","4":"remove_all_unlocked"}[value] || value, size }
      })(buffer, offset)
      let { value: recipes, size: recipesSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = (ctx.string)(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + unlock_typeSize)
      return { value: { unlock_type, recipes }, size: unlock_typeSize + recipesSize}
    },
    packet_camera_instruction: (buffer, offset) => {
      let { value: data, size: dataSize } = (ctx.nbt)(buffer, offset)
      return { value: { data }, size: dataSize}
    },
    packet_compressed_biome_definitions: (buffer, offset) => {
      let { value: raw_payload, size: raw_payloadSize } = (ctx.string)(buffer, offset)
      return { value: { raw_payload }, size: raw_payloadSize}
    },
    packet_trim_data: (buffer, offset) => {
      let { value: patterns, size: patternsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: item_name1, size: item_name1Size } = (ctx.string)(buffer, offset)
          let { value: pattern, size: patternSize } = (ctx.string)(buffer, offset + item_name1Size)
          return { value: { item_name: item_name1, pattern }, size: item_name1Size + patternSize}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset)
      let { value: materials, size: materialsSize } = ((buffer, offset) => {
        const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
        if (count > 0xffffff) throw new Error("array size is abnormally large, not reading: " + count)
        const data = []
        let size = countSize
        for (let i = 0; i < count; i++) {
          const elem = ((buffer, offset) => {
          let { value: material, size: materialSize } = (ctx.string)(buffer, offset)
          let { value: color1, size: color1Size } = (ctx.string)(buffer, offset + materialSize)
          let { value: item_name1, size: item_name1Size } = (ctx.string)(buffer, offset + materialSize + color1Size)
          return { value: { material, color: color1, item_name: item_name1 }, size: materialSize + color1Size + item_name1Size}
        })(buffer, offset + size)
          data.push(elem.value)
          size += elem.size
        }
        return { value: data, size }
      })(buffer, offset + patternsSize)
      return { value: { patterns, materials }, size: patternsSize + materialsSize}
    },
    packet_open_sign: (buffer, offset) => {
      let { value: position, size: positionSize } = (ctx.BlockCoordinates)(buffer, offset)
      let { value: is_front, size: is_frontSize } = (ctx.bool)(buffer, offset + positionSize)
      return { value: { position, is_front }, size: positionSize + is_frontSize}
    },
    string: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError("Missing characters in string, found size is " + buffer.length + " expected size was " + (offset + count))
      }
      return { value: buffer.toString("utf8", offset, offset + count), size: count + countSize }
    },
    ByteArray: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.varint)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError()
      }
      return { value: buffer.slice(offset, offset + count), size: count + countSize }
    },
    SignedByteArray: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.zigzag32)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError()
      }
      return { value: buffer.slice(offset, offset + count), size: count + countSize }
    },
    LittleString: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li32)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError("Missing characters in string, found size is " + buffer.length + " expected size was " + (offset + count))
      }
      return { value: buffer.toString("utf8", offset, offset + count), size: count + countSize }
    },
    ShortArray: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li16)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError()
      }
      return { value: buffer.slice(offset, offset + count), size: count + countSize }
    },
    ShortString: (buffer, offset) => {
      const { value: count, size: countSize } = (ctx.li16)(buffer, offset)
      offset += countSize
      if (offset + count > buffer.length) {
        throw new PartialReadError("Missing characters in string, found size is " + buffer.length + " expected size was " + (offset + count))
      }
      return { value: buffer.toString("utf8", offset, offset + count), size: count + countSize }
    },
    MetadataFlags1: (buffer, offset) => {
      const { value: _value, size } = (ctx.zigzag64)(buffer, offset)
          const value = { _value }
          const flags = {"onfire": 1n,"sneaking": 2n,"riding": 4n,"sprinting": 8n,"action": 16n,"invisible": 32n,"tempted": 64n,"inlove": 128n,"saddled": 256n,"powered": 512n,"ignited": 1024n,"baby": 2048n,"converting": 4096n,"critical": 8192n,"can_show_nametag": 16384n,"always_show_nametag": 32768n,"no_ai": 65536n,"silent": 131072n,"wallclimbing": 262144n,"can_climb": 524288n,"swimmer": 1048576n,"can_fly": 2097152n,"walker": 4194304n,"resting": 8388608n,"sitting": 16777216n,"angry": 33554432n,"interested": 67108864n,"charged": 134217728n,"tamed": 268435456n,"orphaned": 536870912n,"leashed": 1073741824n,"sheared": 2147483648n,"gliding": 4294967296n,"elder": 8589934592n,"moving": 17179869184n,"breathing": 34359738368n,"chested": 68719476736n,"stackable": 137438953472n,"showbase": 274877906944n,"rearing": 549755813888n,"vibrating": 1099511627776n,"idling": 2199023255552n,"evoker_spell": 4398046511104n,"charge_attack": 8796093022208n,"wasd_controlled": 17592186044416n,"can_power_jump": 35184372088832n,"can_dash": 70368744177664n,"linger": 140737488355328n,"has_collision": 281474976710656n,"affected_by_gravity": 562949953421312n,"fire_immune": 1125899906842624n,"dancing": 2251799813685248n,"enchanted": 4503599627370496n,"show_trident_rope": 9007199254740992n,"container_private": 18014398509481984n,"transforming": 36028797018963968n,"spin_attack": 72057594037927936n,"swimming": 144115188075855872n,"bribed": 288230376151711744n,"pregnant": 576460752303423488n,"laying_egg": 1152921504606846976n,"rider_can_pick": 2305843009213693952n,"transition_sitting": 4611686018427387904n,"eating": 9223372036854775808n,"laying_down": 18446744073709551616n,}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    MetadataFlags2: (buffer, offset) => {
      const { value: _value, size } = (ctx.zigzag64)(buffer, offset)
          const value = { _value }
          const flags = {"sneezing": 1n,"trusting": 2n,"rolling": 4n,"scared": 8n,"in_scaffolding": 16n,"over_scaffolding": 32n,"fall_through_scaffolding": 64n,"blocking": 128n,"transition_blocking": 256n,"blocked_using_shield": 512n,"blocked_using_damaged_shield": 1024n,"sleeping": 2048n,"wants_to_wake": 4096n,"trade_interest": 8192n,"door_breaker": 16384n,"breaking_obstruction": 32768n,"door_opener": 65536n,"illager_captain": 131072n,"stunned": 262144n,"roaring": 524288n,"delayed_attacking": 1048576n,"avoiding_mobs": 2097152n,"avoiding_block": 4194304n,"facing_target_to_range_attack": 8388608n,"hidden_when_invisible": 16777216n,"is_in_ui": 33554432n,"stalking": 67108864n,"emoting": 134217728n,"celebrating": 268435456n,"admiring": 536870912n,"celebrating_special": 1073741824n,"unknown95": 2147483648n,"ram_attack": 4294967296n,"playing_dead": 8589934592n,"in_ascendable_block": 17179869184n,"over_descendable_block": 34359738368n,"croaking": 68719476736n,"eat_mob": 137438953472n,"jump_goal_jump": 274877906944n,"emerging": 549755813888n,"sniffing": 1099511627776n,"digging": 2199023255552n,"sonic_boom": 4398046511104n,"has_dash_cooldown": 8796093022208n,"push_towards_closest_space": 17592186044416n,"scenting": 35184372088832n,"rising": 70368744177664n,"feeling_happy": 140737488355328n,"searching": 281474976710656n,}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    AbilitySet: (buffer, offset) => {
      const { value: _value, size } = (ctx.lu32)(buffer, offset)
          const value = { _value }
          const flags = {"build": 1,"mine": 2,"doors_and_switches": 4,"open_containers": 8,"attack_players": 16,"attack_mobs": 32,"operator_commands": 64,"teleport": 128,"invulnerable": 256,"flying": 512,"may_fly": 1024,"instant_build": 2048,"lightning": 4096,"fly_speed": 8192,"walk_speed": 16384,"muted": 32768,"world_builder": 65536,"no_clip": 131072,"privileged_builder": 262144,"count": 524288,}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    UpdateBlockFlags: (buffer, offset) => {
      const { value: _value, size } = (ctx.varint)(buffer, offset)
          const value = { _value }
          const flags = {"neighbors":1,"network":2,"no_graphic":4,"unused":8,"priority":16}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    AdventureFlags: (buffer, offset) => {
      const { value: _value, size } = (ctx.varint)(buffer, offset)
          const value = { _value }
          const flags = {"world_immutable":1,"no_pvp":2,"auto_jump":32,"allow_flight":64,"no_clip":128,"world_builder":256,"flying":512,"muted":1024}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    ActionPermissions: (buffer, offset) => {
      const { value: _value, size } = (ctx.varint)(buffer, offset)
          const value = { _value }
          const flags = {"mine":65537,"doors_and_switches":65538,"open_containers":65540,"attack_players":65544,"attack_mobs":65552,"operator":65568,"teleport":65664,"build":65792,"default":66048}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    UpdateMapFlags: (buffer, offset) => {
      const { value: _value, size } = (ctx.varint)(buffer, offset)
          const value = { _value }
          const flags = {"void": 1,"texture": 2,"decoration": 4,"initialisation": 8,}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    CommandFlags: (buffer, offset) => {
      if ( offset + 1 > buffer.length) { throw new PartialReadError() }
      let bits = buffer[offset++]
      let unused = (bits >> 7) & 0x1
      let collapse_enum = (bits >> 6) & 0x1
      let has_semantic_constraint = (bits >> 5) & 0x1
      let as_chained_command = (bits >> 4) & 0x1
      let unknown2 = (bits >> 0) & 0xf
      return { value: { unused, collapse_enum, has_semantic_constraint, as_chained_command, unknown2 }, size: 1 }
    },
    DeltaMoveFlags: (buffer, offset) => {
      const { value: _value, size } = (ctx.lu16)(buffer, offset)
          const value = { _value }
          const flags = {"has_x":1,"has_y":2,"has_z":4,"has_rot_x":8,"has_rot_y":16,"has_rot_z":32,"on_ground":64,"teleport":128,"force_move":256}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    InputFlag: (buffer, offset) => {
      const { value: _value, size } = (ctx.varint64)(buffer, offset)
          const value = { _value }
          const flags = {"ascend": 1n,"descend": 2n,"north_jump": 4n,"jump_down": 8n,"sprint_down": 16n,"change_height": 32n,"jumping": 64n,"auto_jumping_in_water": 128n,"sneaking": 256n,"sneak_down": 512n,"up": 1024n,"down": 2048n,"left": 4096n,"right": 8192n,"up_left": 16384n,"up_right": 32768n,"want_up": 65536n,"want_down": 131072n,"want_down_slow": 262144n,"want_up_slow": 524288n,"sprinting": 1048576n,"ascend_block": 2097152n,"descend_block": 4194304n,"sneak_toggle_down": 8388608n,"persist_sneak": 16777216n,"start_sprinting": 33554432n,"stop_sprinting": 67108864n,"start_sneaking": 134217728n,"stop_sneaking": 268435456n,"start_swimming": 536870912n,"stop_swimming": 1073741824n,"start_jumping": 2147483648n,"start_gliding": 4294967296n,"stop_gliding": 8589934592n,"item_interact": 17179869184n,"block_action": 34359738368n,"item_stack_request": 68719476736n,"handled_teleport": 137438953472n,"emoting": 274877906944n,}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    ArmorDamageType: (buffer, offset) => {
      const { value: _value, size } = (ctx.u8)(buffer, offset)
          const value = { _value }
          const flags = {"head":1,"chest":2,"legs":4,"feet":8}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    RequestPermissions: (buffer, offset) => {
      const { value: _value, size } = (ctx.lu16)(buffer, offset)
          const value = { _value }
          const flags = {"build":1,"mine":2,"doors_and_switches":4,"open_containers":8,"attack_players":16,"attack_mobs":32,"operator":64,"teleport":128}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    },
    InputLockFlags: (buffer, offset) => {
      const { value: _value, size } = (ctx.varint)(buffer, offset)
          const value = { _value }
          const flags = {"move":2,"jump":4,"sneak":8,"mount":16,"dismount":32,"rotation":64}
          for (const key in flags) {
            value[key] = (_value & flags[key]) == flags[key]
          }
          return { value, size }
    }
  }
  return ctx
}